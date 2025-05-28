
export class BulkResponse<T> {
  
  /** rows contained to the offset and limit of the query */
  rows: T[];
  /** total number of matching rows */
  count: number;
  
  constructor(rows: T[], count: number) {
    this.rows = rows;
    this.count = count;
  }
  
}

export type CreationResponse = { success: boolean };