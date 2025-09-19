import React, { useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useEffect, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';
import axios from "axios";
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {

    const ridePopUpRef = useRef(null);
    const confirmRidePopUpRef = useRef(null);
    const [confirmRidePopUp, setConfirmRidePopUp] = useState(false);
    const [ridePopUp, setRidePopUp] = useState(false);

    const [ride, setRide] = useState(null);

    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    useEffect( () => {
        socket.emit("join", {
            userType: 'captain',
            userId: captain._id
        })

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    console.log({
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();
    }, []);

    socket.on('new-ride', (data) => {
        console.log(data);
        setRide(data)
        setRidePopUp(true)
    });

    async function confirmRide() {
        try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        } catch(err) {
            console.log(err);
        }
    };

    useGSAP(function(){
        if(ridePopUp){
            gsap.to(ridePopUpRef.current,{
                transform: 'translateY(0)'
            })
        }else{
            gsap.to(ridePopUpRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[ridePopUp]);
    
    useGSAP(function(){
        if(confirmRidePopUp){
            gsap.to(confirmRidePopUpRef.current,{
                transform: 'translateY(0)'
            })
        }else{
            gsap.to(confirmRidePopUpRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[confirmRidePopUp]);

    return(
        <div className="h-screen">

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
                <Link to="/captainlogin" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className="h-3/5 bg-gray-600">
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
                {/* <LiveTracking /> */}
            </div>

            <div className="h-2/5 p-6">
                <CaptainDetails />
            </div>

            <div 
            ref={ridePopUpRef}
            className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-5'>
                <RidePopUp 
                ride={ride}
                setRidePopUp={setRidePopUp} 
                setConfirmRidePopUp={setConfirmRidePopUp} 
                confirmRide={confirmRide}
                />
            </div>

            <div 
            ref={confirmRidePopUpRef}
            className='fixed w-full h-screen z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-5'>
                <ConfirmRidePopUp
                ride={ride}
                setConfirmRidePopUp={setConfirmRidePopUp} setRidePopUp={setRidePopUp} />
            </div>
        </div>
    )
}

export default CaptainHome