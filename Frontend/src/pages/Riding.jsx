import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react"
import { SocketContext } from "../context/SocketContext"
import { useNavigate } from "react-router-dom"
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
    const location = useLocation();
    const { ride } = location.state || {};
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    socket.on('ride-ended', () => {
        navigate('/home');
    })

    return(
        <div className="h-screen">

            <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>

            <div className="h-2/4">
                <img className="w-full h-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
                {/* <LiveTracking /> */}
            </div>

            <div className="h-2/4 p-4 bg-white">
                <div className="flex items-center justify-between">
                    <img className="h-12" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="uber car" />

                    <div className="text-right">
                        <h2 className="text-lg font-medium capitalized">{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
                        <p className="text-sm text-gray-600">Suzuki Swift Dezire</p>
                    </div>
                </div>

                <div className="flex gap-2 flex-col justify-between items-center">
                    <div className="w-full mt-5">
                        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
                            <i className="text-lg ri-door-lock-box-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm text-gray-600 -mt-1">{ride?.destination}</p>
                            </div>
                        </div>
    
                        <div className="flex items-center gap-5 p-3">
                            <i className="text-lg ri-bank-card-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl">Make a Payment</button>
            </div>

        </div>
    )
};

export default Riding;