import { ApiResponse } from "@/shared/lib/api";
import { User } from "./login.type";

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}
export interface PaginatedUsers {
  current_page: number;
  data: User[];

  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;

  links: PaginationLink[];

  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;

  to: number | null;
  total: number;
}
export type UsersListResponse = ApiResponse<PaginatedUsers>;
