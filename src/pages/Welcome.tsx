import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useLocalStorage} from "../util/UseLocalStorage";
import {startSession} from "../api/Sessions";

export default function Welcome() {
    let { tableId } = useParams();
    const [session, setSession] = useLocalStorage("session", null);

    useEffect(() => {
        startSession(tableId).then(setSession);
    }, [])

    return (
        <>
            {session != null ? (
                <h1>{session.id}</h1>
            ) : (
                <h1>{tableId}</h1>
            )}

        </>
    )
}