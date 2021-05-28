import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./AddAppPassword.css";
import Header from './Header';


const AddAppPassword = ({ history }) => {
    const [app, setAppName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push("/login")
        }
    }, [history]);

    const apppasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            }
        }

        console.log(localStorage.getItem("authToken"), localStorage.getItem("id"));

        try {
            const { data } = await axios.post(`http://localhost:5000/api/private/addpassword/${localStorage.getItem("id")}`, { app, username, password }, config);
            setAppName("");
            setUsername("");
            setPassword("");
            setMessage(data.data)
            setTimeout(() => {
                setMessage("")
            }, 5000);
        } catch (error) {
            setError(`Error: ${error}`)
            setTimeout(() => {
                setError("")
            }, 5000);
        }
    }

    return (
        <div className="addpassword-screen">
            <Header />
            <div className="contentBx">
                <div className="formBx">
                    <h2>Add Password</h2>
                    {error && <span className="error-message">{error}</span>}
                    {message && <span className="success-message">{message}</span>}
                    <p>Seems like you have forgotten your password for Password Keeper. If its true please enter the email address associated with the account.</p>
                    <form onSubmit={apppasswordHandler} className="formEmailBx" >
                        <div className="inputBx">
                            <input type="text" required placeholder="App name" value={app} onChange={(e) => { setAppName(e.target.value) }} />
                        </div>
                        <div className="inputBx">
                            <input type="text" value={username} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className="inputBx">
                            <input type="password" required placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="submitBx">
                            <input type="submit" value="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAppPassword
