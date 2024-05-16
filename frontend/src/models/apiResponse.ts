import type { Product } from "./product";

export interface Pagination {
    currentPage: number;
    lastPage: number;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
    perPage: number;
    total: number;
}

export interface ProductsResponse {
    products: Product[];
    pagination: Pagination;
}