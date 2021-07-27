import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import Login from "./login.jpg";
import { axiosInstance } from '../../AxiosInstance';

const LoginScreen = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/")
        }
    }, [history]);

    const LoginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }


        try {
            const {data} = await axiosInstance.post("/api/auth/login", { email, password}, config);
            console.log(data)
            localStorage.setItem("id", data.id);
            localStorage.setItem("authToken", data.token);

            history.push("/")

        } catch (error) {
            setError(`Error: ${error}`)
            setTimeout(() => {
                setError("")
            }, 5000);
        }
    }

    return (
        <div className="login-screen">
            <div className="imgBx">
                <img src={Login} alt="loginimage"/>
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <h2>Login</h2>
                    {error && <span className="error-message">{error}</span>}
                    <form onSubmit={LoginHandler} >
                        <div className="inputBx">
                            <span>Email</span>
                            <input 
                               type="email"
                               required
                               value={email}
                               onChange={(e) => {setEmail(e.target.value)}} /> 
                        </div>
                        <div className="inputBx">
                            <span>Password</span>
                            <input 
                               type="password"
                               required
                               value={password}
                               onChange={(e) => {setPassword(e.target.value)}} /> 
                        </div>
                        <div className="forgot-password">
                            <Link to="/forgotpassword" className="forgotLink">Forgot password?</Link>
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Login" />
                        </div>
                        <div className="inputBx">
                            <p>Don't have an account? <Link to="/register" className="signupLink">Signup</Link></p>
                        </div>
                    </form>

                </div>
            </div>
        </div>

        
    )
}

export default LoginScreen
