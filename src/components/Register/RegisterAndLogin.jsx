import React, { useState } from "react";
import { auth } from '../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function RegisterAndLogin() {
    // firebase authentication function
    const history = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState(false);
    const [password, setPassword] = useState("");

    const handleSubmit = (e, type) => {
        e.preventDefault()
        if(type === 'signup'){
            createUserWithEmailAndPassword(auth, email, password)
            .then(data => {
                console.log(data, "authData");
                history('/dashboard');
            }) .catch(error => {  
                setError(error.code);
                setLogin(true); 
            });
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then(data => {
                console.log(data, "authData");
                history('/dashboard');
            }) .catch(error => {
                setError(error.code);
            })
        }
    };
    
    // password reset function
    const handleReset = () => {
        history("/reset");
    }
  return (
    <main className="main">
        <div className="container">
            <div className="register d-flex justify-content-center-align-items-center position-absolute">
                <div className="card text-light bg-dark border border-light">
                    <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center">
                            <h6 role="button" className={login === true ? 'activecolor' : 'pointer'} onClick={() => setLogin(true)}>Log In</h6>
                            <h6 role="button" className={login === false ? 'activecolor' : 'pointer'} onClick={() => setLogin(false)}>Sign Up</h6>
                        </div>
                        <h5 className="mt-2">{login ? 'Welcome, Log In' : 'Sign Up To My_yelp'}</h5>
                        <form onSubmit={(e) => handleSubmit(e, login ? 'signin' : 'signup')}>
                            {error && <div class="alert alert-danger mt-3" role="alert">{error}</div>}
                            <div className="form-floating mb-4 mt-4">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control bg-dark text-light" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" className="form-control bg-dark text-light" id="floatingPassword" placeholder="Password" />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <p onClick={handleReset} role="button" className="link-secondary text-end">{login ? 'Forgot password' : ' '}</p>
                            <button className="btn btn-success w-100 mb-3">{login ? 'Log In' : 'Sign Up'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
};

export default RegisterAndLogin;
