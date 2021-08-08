import React, { useState, useEffect } from 'react';
import "./AddAppPassword.css";
import Header from './Header';
import { axiosInstance } from '../../AxiosInstance';
import {Alert} from 'react-bootstrap';


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

        // console.log(localStorage.getItem("authToken"), localStorage.getItem("id"));

        try {
            const { data } = await axiosInstance.post(`/api/private/addpassword/${localStorage.getItem("id")}`, { app, username, password }, config);
            setAppName("");
            setUsername("");
            setPassword("");
            setMessage(data.data)
            setTimeout(() => {
                setMessage("")
            }, 7000);
        } catch (error) {
            console.log("error",error)
            setError(`App name already exists`)
            setTimeout(() => {
                setError("")
            }, 7000);
        }
    }

    return (
        <div className="addpassword-screen">
            <Header />
            {message && <div className="error-message"><Alert variant='success'>{message}</Alert></div>}
            {error && <div className="error-message"><Alert variant='danger'>{error}</Alert></div>}
            <div className="contentBx">
                <div className="formBx">
                    <h2>Add Password</h2>
                    <form onSubmit={apppasswordHandler} className="formEmailBx" >
                        <div className="inputBx">
                            <input type="text" required placeholder="App name" value={app} onChange={(e) => { setAppName(e.target.value) }} />
                        </div>
                        <div className="inputBx">
                            <input type="text" value={username} placeholder="Username or Email" onChange={(e) => { setUsername(e.target.value) }} />
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
