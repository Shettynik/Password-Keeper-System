import React, { useState } from 'react';
import { axiosInstance } from '../../AxiosInstance';
import "./ForgotPasswordScreen.css"
import { Alert } from 'react-bootstrap';

const ForgotPasswordScreen = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState("");

    const forgotpasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            }
        };

        try {
            const { data } = await axiosInstance.post("/api/auth/forgotpassword", { email }, config);
            setSuccess(data.data);
            setEmail("");

        } catch (error) {
            // setError(error.response.data.message);
            setError(`Email not found`)
            setEmail("");
            setTimeout(() => {
                setError("")
            }, 5000);
        }
    }

    return (
        <div className="forgotpassword-screen">

            <div className="contentBx">

                <div className="formBx">
                    {success && <div className="error-message"><Alert variant='success'>Please check your email and go to the provided link to reset your password</Alert></div>}
                    {error && <div className="error-message"><Alert variant='danger'>{error}</Alert></div>}
                    <h2>Forgot Password</h2>
                    <p>Seems like you have forgotten your password for Password Keeper. If its true please enter the email address associated with the account.</p>
                    <form onSubmit={forgotpasswordHandler} className="formEmailBx" >
                        <div className="emailBx">
                            <input type="email" placeholder="Email Id" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
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

export default ForgotPasswordScreen
