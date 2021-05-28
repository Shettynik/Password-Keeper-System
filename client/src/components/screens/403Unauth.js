import React from 'react'
import { Link } from 'react-router-dom';
import "./403Unauth.css";

const Unauthorized = () => {
    return (
        <div className="error">
        <div className="contentBx">
            <h1>403</h1>
            <div className="paraBx">
                <p>You are not authorized to access this route. Kindly <Link to="/login">login</Link> to access this route.</p>
            </div>
        </div>
    </div>
    )
}

export default Unauthorized;
