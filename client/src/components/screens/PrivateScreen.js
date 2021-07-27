import React, { useState, useEffect } from 'react';
import Header from './Header';
import { axiosInstance } from '../../AxiosInstance';
import Unauthorized from './403Unauth';

const PrivateScreen = ({ history }) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push("/login");
        }

        const fetchPrivateData = async () => {
            console.log(localStorage.getItem("id"))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                }
            }
            // console.log(match.params.id);
            // console.log(config);
            try {
                const { data } = await axiosInstance.get("/api/private", config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("id");
                setError("You are not authorized");
            }
        }

        fetchPrivateData();

    }, [history]); 

    // const logoutHandler = () => {
    //     localStorage.removeItem("authToken");
    //     localStorage.removeItem("id");
    //     history.push("/login")
    // }

    // return error ?
    //     (<span className="error-message">{error}</span>) :
    //     (<>
    //         <div style={{ background: "green", color: "white" }}>{privateData}</div>
    //         <button onClick={logoutHandler}>Logout</button>
    //         <Link to="/addPassword">Add Password</Link>
    //         <Link to="/getAppNames">Get App Names</Link>
    //     </>)
    return error ? <Unauthorized /> : <Header history={history}/>
}

export default PrivateScreen;