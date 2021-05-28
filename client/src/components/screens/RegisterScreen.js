import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
import Signup from "./signup.jpg";

const RegisterScreen = ({history}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/")
        }
    }, [history]);

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if(password !== confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("")
            }, 5000);  // We want to remove the error after five seconds
            return setError("Passwords do not match")

        }

        try {
            const {data} = await axios.post("http://localhost:5000/api/auth/register", {username, email, password}, config);
            console.log(data)
            localStorage.setItem("id", data.id);
            localStorage.setItem("authToken", data.token);

            history.push("/")

        } catch (error) {
            // setError(error.response.data.message);
            setError(`Error: ${error}`)
            setTimeout(() => {
                setError("")
            }, 5000);
        }
    }

    return (
        <div className="signup-screen">
            <div className="imgBx">
                <img src={Signup} alt="signupimage"/>
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <h2>Signup</h2>
                    {error && <span className="error-message">{error}</span>}
                    <form onSubmit={registerHandler} >
                        <div className="inputBx">
                            <span>Email</span>
                            <input 
                               type="email"
                               required
                               value={email}
                               onChange={(e) => {setEmail(e.target.value)}} /> 
                        </div>
                        <div className="inputBx">
                            <span>Username</span>
                            <input 
                               type="text"
                               required
                               value={username}
                               onChange={(e) => {setUsername(e.target.value)}} /> 
                        </div>
                        <div className="inputBx">
                            <span>Password</span>
                            <input 
                               type="password"
                               required
                               value={password}
                               onChange={(e) => {setPassword(e.target.value)}} /> 
                        </div>
                        <div className="inputBx">
                            <span>Confirm Password</span>
                            <input 
                               type="password"
                               required
                               value={confirmPassword}
                               onChange={(e) => {setConfirmPassword(e.target.value)}} /> 
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Signup" />
                        </div>
                        <div className="inputBx">
                            <p>Already have an account? <Link to="/login" className="loginLink">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen
