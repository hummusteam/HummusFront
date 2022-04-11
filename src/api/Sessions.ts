import {Session} from "../types";
import axios from "axios";

export async function startSession(tableId: string): Promise<Session[]> {
    return await axios
        .post('https://sessionapi.tycho.dev/Session/StartSession/' + tableId)
        .then((res) => res.data)
        .catch(console.log)
}