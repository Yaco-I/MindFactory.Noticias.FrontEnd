export interface PagedResult<T> {
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  items: T[];
}