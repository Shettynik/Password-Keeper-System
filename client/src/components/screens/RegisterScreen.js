import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import "./RegisterScreen.css";
import Signup from "./signup.jpg";
import { axiosInstance } from '../../AxiosInstance';

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
            }, 7000);  // We want to remove the error after five seconds
            return setError("Passwords do not match")

        }

        try {
            const {data} = await axiosInstance.post("/api/auth/register", {username, email, password}, config);
            console.log(data)
            localStorage.setItem("id", data.id);
            localStorage.setItem("authToken", data.token);

            history.push("/")

        } catch (error) {
            // setError(error.response.data.message);
            console.log(error)
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
                    {error && <div className="error-message" style={{marginBottom: "5px"}}><Alert variant='danger'>{error}</Alert></div>}
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
