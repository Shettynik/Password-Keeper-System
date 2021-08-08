import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import "./Header.css";

const Header = ({ history }) => {
    const [message, setmessage] = useState("")
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("id");
        setmessage("You have successfully logged out")
        setTimeout(() => {
            setmessage("");
            return <Redirect to="/login" />
        }, 5000)

    }

    if (localStorage.getItem("authToken")==='') {
        <Redirect to="/login" />
    } else {
        return (
            <>
            <div className="header">
                <div className="header-contents">
                    <h3><Link to="/" className="brand-name">Password Keeper</Link></h3>
                    <p className="addpassword"><Link to="/" className="link">Add Password</Link></p>
                    <p className="getpasswords"><Link to="/getAppNames" className="link">Get passwords</Link></p>
                    <p className="logout" onClick={logoutHandler}>Logout</p>
                </div>
            </div>
            {message && <div className="error-message"><Alert variant='success'>{message}</Alert></div>}
            </>
        )
    }
}

export default Header
