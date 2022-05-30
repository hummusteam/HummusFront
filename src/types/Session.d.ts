export default interface Session {
    id: string
    dateTimeCreated: string
    orderIds: string[]
    table: string
    status: number
    password: string
}