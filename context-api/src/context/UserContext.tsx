import { createContext, useState } from 'react'
export const UserContext = createContext<null | object>(null)

export function UserContextProvider({
    children,
}: {
    children: React.ReactElement
}) {
    const [user, setUser] = useState<null | object>()
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
