import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { axiosInstance } from '../../AxiosInstance';
import "./ResetPasswordScreen.css";
import { Alert } from 'react-bootstrap';

const ResetPasswordScreen = ({ match }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetpasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            }
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("")
            }, 5000);
            return setError("Passwords do not match")
        }

        try {
            const { data } = await axiosInstance.put(`/api/auth/passwordreset/${match.params.resetToken}`, { password }, config);
            setSuccess(data.data);
            setPassword("");
            setConfirmPassword("");

        } catch (error) {
            // setError(error.response.data.message);
            setError(`Error: ${error}`)
            setTimeout(() => {
                setError("")
            }, 5000);
        }
    }

    return (
        <div className="forgotpassword-screen">

            <div className="contentBx">

                <div className="formBx">
                    {success && <div className="error-message"><Alert variant='success'>{success}</Alert></div>}
                    {error && <div className="error-message"><Alert variant='danger'>{error}</Alert></div>}
                    <h2>Forgot Password</h2>
                    <p>Seems like you have forgotten your password for Password Keeper. If its true please enter the email address associated with the account.</p>
                    <form onSubmit={resetpasswordHandler} className="formEmailBx" >
                        <div className="emailBx">
                            <input type="password" placeholder="Enter new password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="emailBx">
                            <input type="password" required placeholder="Confirm new password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
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

export default ResetPasswordScreen;
