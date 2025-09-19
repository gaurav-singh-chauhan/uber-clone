import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //     if (!token) {
    //         navigate('/userlogin');
    //         ReadableStreamDefaultController;
    //     }

    //     try {
    //     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
        
    //         if (response.status === 200) {
    //             setUser(response.data)
    //             setIsLoading(false)
    //         }
    //     }
    //         catch(err) {
    //         console.log(`response: ${response}`);
    //         console.error(err.response);
    //         localStorage.removeItem('token');
    //         navigate('/userlogin');
    //         }
    //     };
    //     fetchUserProfile();
    // }, [ token ])
    
    useEffect(() => {
        if (!token) {
            navigate('/userlogin')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(`${import.meta.env.VITE_BASE_URL}/users/profile`);
                console.error(err.response)
                localStorage.removeItem('token')
                navigate('/userlogin')
            })
    }, [ token ]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper