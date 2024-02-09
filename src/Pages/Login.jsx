import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
const Login = () => {
    const [loading, setLoading] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handelLogin=(data)=>{
        setLoading(true)
        const newData = {
            email: data.email,
            password: data.password
        }
        console.log(newData)
        fetch(`https://react-ecommerce-server-phi.vercel.app/getUserByEmail?email=${data.email}&&password=${data.password}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result == true) {
                    setSignUpError('User email or password is not mached')
                    setLoading(false);
                } else {
                    localStorage.setItem('loginId', result._id)
                    const currentUser = {
                        email: result.email
                    }
                    fetch('https://react-ecommerce-server-phi.vercel.app/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(currentUser)
                    })
                        .then(res => res.json())
                        .then(newData => {
                            localStorage.setItem('token', newData.token)
                            console.log(newData)
                            window.location.replace('/');
                            setLoading(false);
                        })


                }
            })
    }

    if(loading){
        return <Loading/>
    }
    return (
        <div className='loginsignup'>
        <div className="loginsignup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(handelLogin)}>
                <div className="loginsignup-fields">
                    <input {...register("email", { required: "email is required" })} name="email" type="email" placeholder='Email Address' />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email?.message}</p>}
                    <input type="password" {...register("password", { required: "password is required", minLength: { value: 6, message: 'Password must be 6 charecter or longer' } })} placeholder='password' />
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                </div>
                <button type="submit">Continue</button>
            </form>
            <p className='loginsignup-login'>Create an new account? <span><Link to={`/signup`}>Signup here</Link></span></p>
            <div className="loginsignup-agree">
                <input type="checkbox" name='' id='' />
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
        </div>
    </div>
    );
};

export default Login;