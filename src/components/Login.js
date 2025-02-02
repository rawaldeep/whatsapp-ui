import React from 'react';
import {Button} from '@material-ui/core';
import "../styles/Login.css";
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = ()=>{
        auth.signInWithPopup(provider).then(result=>{
           dispatch({
               type: actionTypes.SET_USER,
               user: result.user,
           })
        }).catch((error)=> console.log(error.message));
    }
    return (
        <div className="login">
            <div className="login__container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png" alt='login' />
            <div className='login__text'>
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button onClick={signIn}>
                Sign In With Google
            </Button>
            </div>
        </div>
    )
}

export default Login
