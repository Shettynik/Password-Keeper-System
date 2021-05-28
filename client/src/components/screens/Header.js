import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = ({history}) => {
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("id");
        history.push("/login")
    }
    return (
        <div className="header">
            <div className="header-contents">
                <h3><Link to="/" className="brand-name">Password Keeper</Link></h3>
                <p className="addpassword"><Link to="/addPassword" className="link">Add Password</Link></p>
                <p className="getpasswords"><Link to="/getAppNames" className="link">Get passwords</Link></p>
                <p className="logout" onClick={logoutHandler}>Logout</p>
            </div>
        </div>
    )
}

export default Header
