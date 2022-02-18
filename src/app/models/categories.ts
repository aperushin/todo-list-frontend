export interface Category {
  id: number;
  created: string;
  updated: string;
  title: string;
  is_deleted: boolean;
}

export interface CategoryRequest {
  title: string;
}
