import { useContext, useState } from 'react'
import UserContext from '../context/UserContext'

export default function Form() {
    const { setUser } = useContext(UserContext)
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({
            name,
            pass,
        })
        setName('')
        setPass('')
        console.log('ii')
    }
    return (
        <form className="form-wrap" onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="username">UserName</label>
                <input
                    className="form-input"
                    type="text"
                    name="username"
                    id="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-row">
                <label htmlFor="passoword">Password</label>
                <input
                    className="form-input"
                    type="passowrd"
                    name="passoword"
                    id="passoword"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
            </div>
            <div className="form-row">
                <button type="submit" className="form-btn">
                    Submit
                </button>
            </div>
        </form>
    )
}
