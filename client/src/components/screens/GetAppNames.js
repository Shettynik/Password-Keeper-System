import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Header from './Header';
import "./GetAppNames.css";
import { axiosInstance } from '../../AxiosInstance';

const GetAppNames = ({ history }) => {
    const [passwords, setPasswords] = useState([]);
    const [error, seterror] = useState("");
    const [message, setmessage] = useState("");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
    }

    const getPassword = async (app) => {
        try {
            const { data } = await axiosInstance.get(`/api/private/getpassword/${localStorage.getItem("id")}?app=${app}`, config);
            setmessage(`${app.toUpperCase()} password sent to your registered email`);
            setTimeout(() => {
                setmessage("")
            }, 10000)
        } catch (error) {
            seterror(error);
            setTimeout(() => {
                seterror("")
            }, 10000)
        }
    }

    const getAppNames = async () => {

        const { data } = await axiosInstance.get(`/api/private/getappnames/${localStorage.getItem("id")}`, config)
        setPasswords(data.data);
    }

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push("/login")
        }

        getAppNames()
    }, [history]);
    return (
        <div className="getpasswords-screen">
            <Header />
            {message && <div className="error-message"><Alert variant='success'>{message}</Alert></div>}
            {error && <div className="error-message"><Alert variant='danger'>{error}</Alert></div>}
            <div className="contentBx">
                <div className="buttonsBx">
                    {passwords && passwords.map((password) => {
                        return <div id={password._id} className="btnBx">
                            <button onClick={() => { getPassword(password.app) }} >{password.app}</button>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default GetAppNames
