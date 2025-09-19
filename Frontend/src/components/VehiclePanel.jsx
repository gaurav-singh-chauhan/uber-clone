import React from "react";

const VehiclePanel = (props)=>{
    return(
        <div>

            <h5 
            onClick={()=>{
                props.setVehiclePanel(false)
            }}
            className="p-1 text-center w-[93%] absoulte top-0">
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mb-5">Choose your ride</h3>

            {/* Vehicle type-1 */}
            <div 
            onClick={()=>{
                props.setConfirmRidePanel(true)
                props.setVehicle('motorcycle')
            }}
            className="flex border-2 border-gray-100 active:border-black items-center justify-between rounded-xl w-full p-3 mb-2">
                    <img className="h-16" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car" />

                    <div className="-ml-1 w-1/2">
                        <h4 className="font-medium text-base">Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                        <h5 className="font-medium text-sm">3 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, motorcycle rides</p>
                    </div>

                    <h2 className="font-semibold text-lg">₹{props.fare.motorcycle}</h2>
            </div>

            {/* Vehicle type-2 */}
            <div 
            onClick={()=>{
                props.setConfirmRidePanel(true)
                props.setVehicle('auto')
            }}
            className="flex border-2 border-gray-100 active:border-black items-center justify-between rounded-xl w-full p-3 mb-2">
                    <img className="h-16" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car" />

                    <div className="ml-2 w-1/2">
                        <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                        <h5 className="font-medium text-sm">3 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, auto rides</p>
                    </div>

                    <h2 className="font-semibold text-lg">₹{props.fare.auto}</h2>
            </div>

            {/* Vehicle type-3 */}
            <div 
            onClick={()=>{
                props.setConfirmRidePanel(true)
                props.setVehicle('car')
            }}
            className="flex border-2 border-gray-100 active:border-black items-center justify-between rounded-xl w-full p-3 mb-2">
                    <img className="h-16" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car" />

                    <div className="ml-2 w-1/2">
                        <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                    </div>

                    <h2 className="font-semibold text-lg">₹{props.fare.car}</h2>
            </div>

        </div>
    )
};

export default VehiclePanel;