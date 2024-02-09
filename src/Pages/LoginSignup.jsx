import React, { useState } from 'react';
import './CSS/LoginSignup.css'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
const LoginSignup = () => {

    const [loading, setLoading] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handelSignUp = (data) => {
        setLoading(true)
        const user = {
            name: data.fullName,
            email: data.email,
            password: data.password,
            loginStatus: true
        }
        fetch('https://react-ecommerce-server-phi.vercel.app/addUser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.acknowledged == true) {
                    const currentUser = {
                        email: data.email
                    }
                    fetch('https://react-ecommerce-server-phi.vercel.app/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(currentUser)
                    })
                    .then(res => res.json())
                    .then(newData=>{
                        localStorage.setItem('token', newData.token)
                        localStorage.setItem('loginId', result.insertedId);
                        setLoading(false);
                        navigate('/')
                    })
                   
                }
                if (result == false) {
                    setSignUpError('User email already exist')
                    setLoading(false);
                }
            })
            .catch(error => {
                setSignUpError(error.message);
                setLoading(false);
            })
    }

    if(loading){
        return <Loading/>
    }
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit(handelSignUp)}>
                    <div className="loginsignup-fields">
                        <input type="text" {...register("fullName", { required: "Name is required" })} name="fullName" placeholder='Your Name' />
                        {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName?.message}</p>}
                        <input {...register("email", { required: "email is required" })} name="email" type="email" placeholder='Email Address' />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email?.message}</p>}
                        <input type="password" {...register("password", { required: "password is required", minLength: { value: 6, message: 'Password must be 6 charecter or longer' } })} placeholder='password' />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <button type="submit">Continue</button>
                </form>
                <p className='loginsignup-login'>Already have an account? <span><Link to={'/login'}>Login here</Link></span></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;