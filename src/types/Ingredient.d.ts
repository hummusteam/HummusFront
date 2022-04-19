export default interface Ingredient {
    id?: string,
    name: string,
    dateTimeCreated?: string,
    amount: string,
    allergens: string[],
}
