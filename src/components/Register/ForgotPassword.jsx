import React, { useState } from "react";
import { auth } from '../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
    // reset password functions
    const history = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        sendPasswordResetEmail( auth, email ).then(data => {
            alert("Check your email");
            history("/");
        }) .catch(error => {
            setError(error.code)
        });
    }
  return (
    <>
        <main className="main">
            <div className="container">
                <div className="register d-flex justify-content-center align-items-center position-absolute">
                    <div className="card bg-dark text-light border border-light">
                        <div className="card-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <h3 className="mt-3">Reset password</h3>
                                {error && <div class="alert alert-danger mt-3" role="alert">{error}</div>}
                                <div className="form-floating mb-3 mt-4">
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control bg-dark text-light" id="floatingInput" placeholder="name@example.com" />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <button type="submit" className="btn btn-success w-100 h-25 p-2 mt-3">Reset password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  );
};

export default ForgotPassword;
