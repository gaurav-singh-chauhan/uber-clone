import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {

    const finishRidePanelRef = useRef(null);
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const location = useLocation();
    const rideData = location.state?.ride;

    useGSAP(function(){
            if(finishRidePanel){
                gsap.to(finishRidePanelRef.current,{
                    transform: 'translateY(0)'
                })
            }else{
                gsap.to(finishRidePanelRef.current,{
                    transform: 'translateY(100%)'
                })
            }
        },[finishRidePanel]);

    return(
        <div className="h-screen">
        {/* <div className='h-screen relative flex flex-col justify-end'> */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
                <Link to="/captainlogin" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className="h-4/5 bg-gray-600">
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
            </div>

            <div className="h-1/5 p-6 bg-gray-200 relative">
                <h5 
                className="text-center w-full absoulte top-0">
                    <i className="text-3xl text-gray-800 ri-arrow-down-wide-line"></i>
                </h5>
                <div className="flex items-center justify-between mt-2">
                    <h4 className="text-xl font-semibold">4 KM away</h4>
                    <button onClick={
                        ()=>{
                            setFinishRidePanel(true);
                        }
                    } className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">Complete Ride</button>
                </div>
            </div>

            <div className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-5' ref={finishRidePanelRef}>
                <FinishRide 
                ride={rideData}
                setFinishRidePanel={setFinishRidePanel}/>
            </div>

            {/* <div className='h-screen fixed w-screen top-0 z-[-1]'> */}
                {/* <LiveTracking /> */}
            {/* </div> */}
        {/* </div> */}
        </div>
    )
}

export default CaptainRiding;