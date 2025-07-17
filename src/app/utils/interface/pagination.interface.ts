export interface PaginationInterface<T> {
    content: T[],
    pageNumber: number,
    pageSize: number,
    totalElements: number
}