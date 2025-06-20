import fs from 'fs';
import p from 'path';

import { globSync } from 'glob';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type QueryType = 'query' | 'view';

type QueryProps<Q extends QueryType> = {
  name: string;
  type: Q;
  query: string;
  dependencies: string[];
  runOnStartUp?: boolean;
};

class Query<Q extends QueryType> implements QueryProps<Q> {

  name: string;
  type: Q;
  query: string;
  dependencies: string[];
  runOnStartUp?: boolean;
  
  constructor({
    name, type, query, dependencies = [], runOnStartUp = false,
  }: PartialBy<QueryProps<Q>, 'dependencies'>) {
    this.name = name;
    this.type = type;
    this.query = query;
    this.dependencies = Array.from(new Set(dependencies));
    this.runOnStartUp = runOnStartUp;
  }
  
  addDependency(name: string) {
    if (this.name === name || this.dependencies.includes(name)) {
      return;
    }
    this.dependencies.push(name);
  }
  
  dependsOn(name: string) {
    return this.dependencies.includes(name);
  }
  
}

type QueryGroup<Q extends QueryType> = {
  queries: { [key in string]: Query<Q> };
  order: string[];
  runOnStartUp?: boolean;
};

const OUTPUT_FILE = 'src/api/v1/schema/queries.ts';

const queries: { [key in QueryType]?: QueryGroup<key> } = {};

function addQueries<Q extends QueryType>(type: Q, qs: { [key in string]: Query<Q> }) {
  const allqs = { ...queries[type]?.queries, ...qs };
  const order = 
    Object.values(allqs)
      .sort((a, b) => a.dependsOn(b.name) ? 1 : b.dependsOn(a.name) ? -1 : 0)
      .map((query) => query.name);
  queries[type] = {
    ...queries[type],
    order,
    queries: allqs,
    runOnStartUp: type === 'view',
  };
}

function loadQueries(type: QueryType, pattern: string) {
  const files = globSync(pattern);
  const qs: { [key in string]: Query<typeof type> } = {};
  for (const file of files) {
    const name = p.basename(file).replace(/\.sql$/, '').toLowerCase();
    const contents = fs.readFileSync(file, { encoding: 'utf8' }).replace(/\n+/g, '\n');
    const query = new Query({
      name, query: contents, type,
    });
    const matches = [...contents.matchAll(/\b(?:from|join)[\s\t\n]+(\w+)\b/gi)];
    if (matches) {
      matches.forEach((m) => {
        const [, dep] = m;
        query.addDependency(dep);
      });
    }
    qs[name] = query;
    if (type == 'view' && /CREATE MATERIALIZED VIEW/i.test(contents)) {
      const refname = ['refresh', name].join('_');
      addQueries('query', { 
        [refname]: new Query({
          dependencies: [name],
          name: refname,
          query: `REFRESH MATERIALIZED VIEW ${name};`,
          type: 'query',
        }),
      });
    }
  }
  addQueries(type, qs);
}

loadQueries('query', 'src/**/queries/*.sql');
loadQueries('view', 'src/**/*view.sql');

fs.writeFileSync(
  OUTPUT_FILE, 
  `/* eslint-disable */
// this file is generated by running \`yarn sql\`. do not edit

export type QueryType = 'query' | 'view';

export type QueryProps<Q extends QueryType> = {
  name: string;
  type: Q;
  query: string;
  dependencies: string[];
  runOnStartUp?: boolean;
};

export type QueryGroup<Q extends QueryType> = {
  queries: { [key in string]: QueryProps<Q> };
  order: string[];
  runOnStartUp?: boolean;
};

export const QUERIES: {
  query: QueryGroup<"query">;
  view: QueryGroup<"view">;
} = ${JSON.stringify(queries, null, 2)};
export type QueryKey = keyof typeof QUERIES['query']['queries'];
export type ViewKey = keyof typeof QUERIES['view']['queries'];

export class QueryFactory {

  static getQuery(key: QueryKey) {
    return QUERIES['query'].queries[key].query;
  }

}

`
);

for (const [name, group] of Object.entries(queries)) {
  console.log(name);
  console.log(Object.keys(group.queries));
  console.log('-----');
}
