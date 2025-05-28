import React from 'react';

import { PublicArticleAttributes } from '~/api';
import { View } from '~/components';
import { useApi } from '~/hooks';

const Index = () => {

  const { api } = useApi({ nonce: '', state: {} });
  
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [articles, setArticles] = React.useState<PublicArticleAttributes[]>([]);

  React.useEffect(() => {
    (async () => {
      if (loading || loaded) {
        return;
      }
      try {
        const { data } = await api.getArticles({});
        setArticles(data.rows);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    })();
  }, [loading, articles, api, loaded]);

  return (
    <View>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={ article.id }>
              {article.title}
              {article.body}
            </li>
          ))}
        </ul>
      )}
    </View>
  );
};

export default Index;
