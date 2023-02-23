export type CheckRandomHelper = { hasId?: boolean, hasUserId?: boolean, hasCompanyId?: boolean }

export type Login = {
  email: string
  password: string
}

export type PaginatedResponse<T> = {
  records: T[],
  total: number,
  skip: string,
  take: string,
}

export type QueryType<T> = Partial<T> & {
  skip?: string,
  take?: string,
}