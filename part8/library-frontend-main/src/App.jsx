import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm.jsx";
import {Link, Navigate, Route, Routes} from "react-router";
import {useEffect, useState} from "react";
import {useApolloClient} from "@apollo/client/react";
import UserRecommendations from "./components/UserRecommendations.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(localStorage.getItem('user-token'))
    }, [])

    const client = useApolloClient();

    const handleLogout = async () => {
        setToken(null)
        localStorage.removeItem('user-token')
        await client.resetStore()
    }

    return (
        <div>
            <Notification />
            <div style={{display: "flex", flexDirection: "row", gap: 5}}>
                <Link to="/">authors</Link>
                <Link to="/books">books</Link>
                {token ? (
                        <>
                            <Link to="/books/add">add book</Link>
                            <Link to="/user/recommend">recommend</Link>
                            <a href="#" onClick={handleLogout}>logout</a>
                        </>
                    )
                    : <Link to="/login">login</Link>}
            </div>

            <Routes>
                <Route path="/" element={<Authors token={token}/>}/>
                <Route path="/books" element={<Books/>}/>
                <Route path="/books/add" element={token ? <NewBook/> : <Navigate to={'/login'}/>}/>
                <Route path="/login" element={!token ? <LoginForm setToken={setToken}/> : <Navigate to={'/'}/>}/>
                <Route path="/user/recommend" element={token ? <UserRecommendations /> : <Navigate to={'/login'}/>} />
            </Routes>
        </div>
    )
}

export default App
