import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])

    return (<UserContext.Provider value={{users, setUsers, loading, setLoading, followers, followings, setFollowers, setFollowings}}>
        {children}
    </UserContext.Provider>)
}