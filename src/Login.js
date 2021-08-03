import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault(); //stop refresh
        auth
            .signInWithEmailAndPassword(email, password) //async function
            .then(auth => {
                if (auth) {
                    history.push('/'); //redirect to home screen
                }
            })
            .catch(error => alert(error.message));
    };
    const register = e => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth) {
                    history.push('/'); //redirect to home screen
                }
            })
            .catch(error => alert(error.message));
    };

    return (
        <div className="login">
            <Link to="/">
                <img 
                    className="login-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                />
            </Link>
            <div className="login-container">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button className="login-signInButton" onClick={signIn}>Sign In</button>
                </form>
                <p>
                    By signing-in you agree to the Amazon conditions of use & sale. Please see our privacy notice, our cookie notice, and our interest-based ads notice. 
                </p>
                <button className="login-registerButton" onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
    );
}
 
export default Login;