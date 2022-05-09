export default interface Session {
  id: string
  dateTimeCreated: string
  orderIds?: string[]
  table: string
  status: SessionStatusinteger
}

enum SessionStatusinteger {
  SUBMITTED = 0,
  IN_PREPARATION = 1,
  DISPATCHED = 2,
}
