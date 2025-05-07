export interface PagePaginationParams {
  page: number;
  pageSize: number;
  status?: 'possession' | 'contractProceeding' | 'contractCompleted';
  searchBy?: 'companyName' | 'name' | 'email' | 'carNumber' | 'model';
  keyword?: string;
}

export interface PagePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
  data: T[];
}

export interface CursorPaginationParams {
  cursor: number;
  limit: number;
}

export interface CursorPaginationResult<T> {
  list: T[];
  nextCursor: number | null;
}
