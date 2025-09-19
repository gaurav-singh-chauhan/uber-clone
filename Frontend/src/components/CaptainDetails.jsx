import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);
    return(
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngpCIXFQaVRATN2X2fIFdGJx91bVEZOuurQ&s" alt="pfp" />
                    <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹990.20</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>

            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5'>
                <div className='text-center'>
                    <i className='text-3xl font-thin ri-timer-2-line'></i>
                    <h5 className='text-lg font-medium mt-2'>10H 20M</h5>
                    <p className='text-sm text-gray-600'>HOURS ONLINE</p>
                </div>
                <div className='text-center'>
                    <i className='text-3xl font-thin ri-speed-up-line'></i>
                    <h5 className='text-lg font-medium mt-2'>40 KM</h5>
                    <p className='text-sm text-gray-600'>TOTAL DISTANCE</p>
                </div>
                <div className='text-center'>
                    <i className='text-3xl font-thin ri-taxi-line'></i>
                    <h5 className='text-lg font-medium mt-2'>7</h5>
                    <p className='text-sm text-gray-600'>TOTAL TRIPS</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails;