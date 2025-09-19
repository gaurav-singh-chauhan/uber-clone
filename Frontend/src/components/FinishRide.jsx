import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const FinishRide = (props) => {
    const navigate = useNavigate();

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.status === 200) {
            navigate('/captain-home')
        }
    }

    return(
        <div>
            <h5 
            onClick={()=>{
                props.setFinishRidePanel(false)
            }}
            className="p-1 text-center w-full">
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl text-center font-semibold mb-5">Finish this Ride</h3>

            <div className="flex items-center justify-between mt-4 p-4 border-2 border-gray-400 bg-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngpCIXFQaVRATN2X2fIFdGJx91bVEZOuurQ&s" alt="captain-pfp" />
                    <h2 className="font-medium text-lg captialized">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <div>
                    <h5 className="text-lg font-semibold">2.2 KM</h5>
                </div>
            </div>

            <div className="flex gap-2 flex-col justify-between items-center">
                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-door-lock-box-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.ride?.destination}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-lg ri-bank-card-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                        </div>
                    </div>
                </div>

                <div className="mt-6 w-full p-5">
                        <button
                        onClick={
                            endRide
                        }
                        className="w-full mt-5 flex justify-center bg-green-600 text-white text-lg font-semibold p-3 rounded-lg">
                            Finish Ride
                        </button>

                        <p className="mt-10 text-xs">Click on finish ride button if you have received the payment</p>
                </div>
            </div>
        </div>
    )
}

export default FinishRide;