import {useEffect, useState} from 'react'
import {useMutation} from "@apollo/client/react";
import {LOGIN} from "../queries.js";
import {useNavigate} from "react-router";
import { useNotificationDispatch, setNotification } from '../NotificationContext'

const LoginForm = ({setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [login, result] = useMutation(LOGIN)
    const notificationDispatch = useNotificationDispatch()
    
    const navigate = useNavigate()
    
    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)

            navigate('/')
        }
    }, [result.data])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            await login({variables:{username, password}})
            setNotification(notificationDispatch, 'Logged in successfully', 'success')
        } catch (error) {
            setNotification(notificationDispatch, error.message, 'error')
        }
        
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm