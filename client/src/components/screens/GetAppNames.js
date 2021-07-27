import React, { useState, useEffect } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
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
            setmessage(data.data);
            setTimeout(() => {
                setmessage("")
            }, 5000)
        } catch (error) {
            seterror(error);
            setTimeout(() => {
                seterror("")
            }, 5000)
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

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">{"Success!!" ? message : "Error"}</Popover.Title>
            <Popover.Content>
                {message ? message : error}
            </Popover.Content>
        </Popover>
    );

    return (
        <div className="getpasswords-screen">
            <Header />
            <div className="contentBx">
                <div className="buttonsBx">
                    {passwords && passwords.map((password) => {
                        return <div id={password._id} className="btnBx">

                            <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                                <button onClick={() => { getPassword(password.app) }} >{password.app}</button>
                            </OverlayTrigger>

                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default GetAppNames
