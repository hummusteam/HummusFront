import axios from "axios";
import { MenuItem } from "../types";

export default async function fetchCategories() : Promise<MenuItem[]> {
    return await axios.get("https://menuapi.tycho.dev/MenuItem").then(res => res.data).catch(console.log);
}