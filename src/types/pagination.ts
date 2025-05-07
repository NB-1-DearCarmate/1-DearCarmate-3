export interface PagePaginationParams {
  page: number;
  pageSize: number;
  status?: 'possession' | 'contractProceeding' | 'contractCompleted';
  searchBy?: 'companyName' | 'name' | 'email' | 'carNumber' | 'model';
  keyword?: string;
}
