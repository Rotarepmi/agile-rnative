import { useRef, useCallback, useState } from "react";
import { db } from "../firebase";

function useUsersRef() {
    const usersRef = useRef(db.collection("users"));
    // const [user, setUser] = useState<any>();

    const getUser = useCallback((userId: string) => {
        return usersRef.current.doc(userId).get();
    }, []);

    return { usersRef, getUser };
}

export default useUsersRef;
