import React from "react";

const RidePopUp = (props) => {

    return(
        <div>
            <h5 
            onClick={()=>{
                props.setRidePopUp(false)
            }}
            className="p-1 text-center w-[93%] absoulte top-0">
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl text-center font-semibold mb-5">New Ride Available!</h3>

            {/* Captain Info */}
            <div className="flex items-center justify-between mt-4 p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngpCIXFQaVRATN2X2fIFdGJx91bVEZOuurQ&s" alt="captain-pfp" />
                    <h2 className="font-medium text-lg">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <div>
                    <h5 className="text-lg font-semibold">2.2 KM</h5>
                </div>
            </div>

            {/* Ride Info */}
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

                <button 
                onClick={() => {
                    props.setConfirmRidePopUp(true)
                    props.setRidePopUp(false)
                    props.confirmRide()
                }}
                className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl">Accept</button>

                <button 
                onClick={()=>{
                    props.setRidePopUp(false)
                }} 
                className="w-full mt-1 bg-gray-300 text-gray-800 font-semibold p-2 rounded-xl">Ignore</button>
            </div>
        </div>
    )
}

export default RidePopUp;