import React, {useState} from 'react';
import axios from "axios";
import "./ForgotPasswordScreen.css"

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
            const {data} = await axios.post("/api/auth/forgotpassword", {email}, config);
            setSuccess(data.data);

        } catch (error) {
            // setError(error.response.data.message);
            setError(`Error: ${error.response}`)
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
                    <h2>Forgot Password</h2>
                    {error && <span className="error-message">{error}</span>}
                    {success && <span className="success-message">{success}</span>}
                    <p>Seems like you have forgotten your password for Password Keeper. If its true please enter the email address associated with the account.</p>
                    <form onSubmit={forgotpasswordHandler} className="formEmailBx" >
                        <div className="emailBx">
                            <input type="email" placeholder="Email Id" required value={email} onChange={(e) => {setEmail(e.target.value)}} />
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
