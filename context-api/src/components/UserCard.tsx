import { useContext } from 'react'
import UserContext from '../context/UserContext'

export default function UserCard() {
    const { user } = useContext(UserContext)
    if (!user) return <p>please login</p>
    return <div className="user-card">hello {user.name}</div>
}
