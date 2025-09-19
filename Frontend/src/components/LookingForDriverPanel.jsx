import React from "react";

const LookingForDriverPanel = (props) => {
    return(
        <div>

            <h3 className="text-2xl text-center font-semibold mb-5">Looking for a Driver...</h3>

            <div className="flex gap-2 flex-col justify-between items-center">
                <img className="h-20" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="uber car" />

                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.pickup}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-door-lock-box-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm text-gray-600 -mt-1">{props.destination}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-lg ri-bank-card-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{props.fare[ props.vehicleType ]}</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default LookingForDriverPanel;