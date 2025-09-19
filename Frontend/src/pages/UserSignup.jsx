import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const { user, setUser } = React.useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status === 201){
            const data = response.data

            setUser(data.user)
            localStorage.setItem('token', data.token);
            navigate('/home');
        }

        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }

    return(
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png" alt="uber" 
                />

                <form onSubmit={(e) => {
                    submitHandler(e);
                }}>
                    <h3 className="text-lg font-medium mb-2">What's your name?</h3>
                    <div className="flex gap-4 mb-6">
                        <input 
                        className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 border text-lg placholder:text-base"
                        type="text"
                        value={firstName}
                        onChange={(e)=>{
                            setFirstName(e.target.value)
                        }}
                        required 
                        placeholder="First name"
                        />
                        <input 
                        className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 border text-lg placholder:text-base"
                        type="text"
                        value={lastName}
                        onChange={(e)=>{
                            setLastName(e.target.value)
                        }}
                        required 
                        placeholder="Last name"
                        />
                    </div>

                    <h3 className="text-lg font-medium mb-2">What's your email?</h3>
                    <input 
                    className="bg-[#eeeeee] mb-6 rounded w-full px-4 py-2 border text-lg placholder:text-base"
                    type="email"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    required 
                    placeholder="youremail@example.com"
                    />

                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input 
                    className="bg-[#eeeeee] mb-6 rounded w-full px-4 py-2 border text-lg placholder:text-base"
                    type="password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    required 
                    placeholder="your password"
                    />

                    <button 
                    className="bg-[#111] mb-3 rounded w-full px-4 py-2 text-white font-semibold placholder:text-base cursor-pointer">
                        Sign Up
                    </button>
                </form>

                <p className="text-center">
                    Already an User? &nbsp;
                    <Link to='/userlogin' className="text-blue-600">
                    Login here
                    </Link>
                </p>
            </div>

            <div>
                <p className="text-[10px] leading-tight">
                    This site is protected  by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply.</span>
                </p>
            </div>
        </div>
    )
}

export default UserSignup