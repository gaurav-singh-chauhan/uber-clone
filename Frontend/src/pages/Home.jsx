import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import LookingForDriverPanel from "../components/LookingForDriverPanel";
import DriverFoundPanel from "../components/DriverFoundPanel";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom"
import LiveTracking from "../components/LiveTracking";

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const lookingForDriverPanelRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const driverFoundRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);
    const [driverFoundPanel, setDriverFoundPanel] = useState(false);

    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);

    const [ fare, setFare ] = useState({});

    const [ vehicleType, setVehicleType ] = useState(null);

    const [ ride, setRide ] = useState(null);

    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    const navigate = useNavigate();

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ]);

    socket.on('ride-confirmed', ride => {
        setDriverFoundPanel(true)
        setVehiclePanel(false)
        setRide(ride);
    })

    socket.on('ride-started', ride => {
        setDriverFoundPanel(false)
        navigate('/riding', { state: { ride } });
    });

    const handlePickupChange = async(e) => {
        setPickup(e.target.value)

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, { 
                params: { 
                    input: e.target.value 
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPickupSuggestions(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDestinationChange = async(e) => {
        setDestination(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, { 
                params: { 
                    input: e.target.value 
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setDestinationSuggestions(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // setPanelOpen(false);
        // setVehiclePanel(true);
    }

    async function findTrip(){
        setPanelOpen(false);
        setVehiclePanel(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: {
                pickup, 
                destination
            },
            headers: {
                Authorization: `bearer ${localStorage.getItem('token')}`
            }
        });

        setFare(response.data);
    }

    useGSAP(function(){
        if(panelOpen){
            gsap.to(panelRef.current,{
            height: '70%',
            padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else{
            gsap.to(panelRef.current,{
                height: '0%',
                padding: 0
                })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen]);

    useGSAP(function(){
        if(vehiclePanel){
            gsap.to(vehiclePanelRef.current,{
                transform: 'translateY(0)'
            })
        }else{
            gsap.to(vehiclePanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[vehiclePanel]);
    
    useGSAP(function(){
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current,{
                transform: 'translateY(0)'
            })
        }else{
            gsap.to(confirmRidePanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[confirmRidePanel]);
    
    useGSAP(function(){
        if(lookingForDriverPanel){
            gsap.to(lookingForDriverPanelRef.current,{
                transform: 'translateY(0)'
            })
        }else{
            gsap.to(lookingForDriverPanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[lookingForDriverPanel]);
    
    useGSAP(function(){
        if(driverFoundPanel){
            gsap.to(driverFoundRef.current,{
                transform: 'translateY(0)'
            })
        }else{
            gsap.to(driverFoundRef.current,{
                transform: 'translateY(100%)'
            })
        }
    },[driverFoundPanel]);

    async function createRide(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        },
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    return(
        <div className="h-screen relative overflow-hidden">
            {/* Uber Logo */}
            <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png" alt="Uber logo" />

            {/* Uber Map in the background */}
            <div className="h-screen w-screen">
                {/* image for temporary use */}
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
                {/* <LiveTracking /> */}
            </div>

            {/* Find your Trip form with location Panel */}
            <div className="h-screen absolute top-0 w-full flex flex-col justify-end">

                <div className="h-[30%] p-6 bg-white relative">

                    <h5 
                    className="absolute opacity-0 top-6 right-6 text-2xl"
                    ref={panelCloseRef}
                    onClick={()=>{
                        setPanelOpen(false)
                    }}>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>

                    <form
                    onSubmit={(e)=>{
                        submitHandler(e)
                    }}>

                        <div className="line absolute h-16 w-1 top-[43%] left-9 bg-gray-900 rounded-full"></div>

                        <input 
                        onClick={()=>{
                            setPanelOpen(true)
                            setActiveField('pickup')
                        }}
                        value={pickup}
                        onChange={handlePickupChange}
                        className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5" type="text" 
                        placeholder="Add a pick-up location" />

                        <input
                        onClick={()=>{
                            setPanelOpen(true)
                            setActiveField('destination')
                        }}
                        value={destination}
                        onChange={handleDestinationChange}
                        className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3" type="text" 
                        placeholder="Enter your destination" />
                        {/* <button className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
                            Find trip
                        </button> */}
                    </form>

                    <button onClick={findTrip} className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
                            Find trip
                        </button>
                </div>

                {/* Locations Panel */}
                <div ref={panelRef} className="bg-white h-0">
                    <LocationSearchPanel 
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen} 
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>

            </div>

            {/* Select Vehicle Panel */}
            <div ref={vehiclePanelRef} className="fixed z-10 bottom-0 translate-y-full px-3 py-10 pt-12 w-full bg-white">
                <VehiclePanel 
                setVehicle={setVehicleType}
                fare={fare} setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel}/>
            </div>

            {/* Confirmed Ride Panel */}
            <div ref={confirmRidePanelRef} className="fixed z-10 bottom-0 translate-y-full px-3 py-6 pt-12 w-full bg-white">
                <ConfirmRidePanel
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                vehicleType={vehicleType}
                fare={fare}
                setConfirmRidePanel={setConfirmRidePanel} setLookingForDriverPanel={setLookingForDriverPanel}
                />
            </div>

            {/* Looking for Driver Panel */}
            <div ref={lookingForDriverPanelRef} className="fixed z-10 bottom-0 translate-y-full px-3 py-6 pt-12 w-full bg-white">
                <LookingForDriverPanel
                pickup={pickup}
                destination={destination}
                vehicleType={vehicleType}
                fare={fare}
                />
            </div>

            {/* Driver Found */}
            <div ref={driverFoundRef} className="fixed z-10 bottom-0 px-3 py-6 pt-12 w-full bg-white">
                <DriverFoundPanel 
                ride={ride}
                setDriverFoundPanel={setDriverFoundPanel}/>
            </div>
        </div>
    )
}

export default Home