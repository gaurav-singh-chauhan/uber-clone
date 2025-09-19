import React from "react";

const DriverFoundPanel = (props) => {
    return(
        <div>
            <h5 
            onClick={()=>{
                props.setDriverFoundPanel(false)
            }}
            className="p-1 text-center w-[93%] absoulte top-0">
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <div className="flex items-center justify-between">

                <img className="h-12" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="uber car" />

                <div className="text-right">
                    <h2 className="text-lg font-medium capitalize">{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h2>
                    <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
                    <p className="text-sm text-gray-600">Suzuki Swift Dezire</p>
                    <h1 className="text-lg font-semibold">{props.ride?.otp}</h1>
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

            </div>
        </div>
    )
};

export default DriverFoundPanel;