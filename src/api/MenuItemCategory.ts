import axios from "axios";
import { MenuItem } from "../types";

export default async function fetchItemByCategory(category: string) : Promise<MenuItem[]> {
    return await axios.get(`https://menuapi.tycho.dev/MenuItem/GetByCategory/${category}`).then(res => res.data).catch(console.log);
}