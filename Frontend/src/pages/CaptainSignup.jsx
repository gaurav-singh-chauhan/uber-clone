import React, {useState} from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";;
import axios from 'axios';

const CaptainSignup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType,
            },
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

        if(response.status === 201){
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
        
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    }

    return(
        <div className="px-5 py-5 h-screen flex flex-col justify-between">
            <div className="mb-10">
                <img className="w-20 mb-3" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="uber" 
                />

                <form onSubmit={(e) => {
                    submitHandler(e);
                }}>
                    <h3 className="text-lg font-medium mb-2">What's your name?</h3>
                    <div className="flex gap-4 mb-6">
                        <input 
                        className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 border text-lg placholder:text-base"
                        type="text"
                        value={firstName}
                        onChange={(e)=>{
                            setFirstName(e.target.value)
                        }}
                        required 
                        placeholder="First name"
                        />
                        <input 
                        className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 border text-lg placholder:text-base"
                        type="text"
                        value={lastName}
                        onChange={(e)=>{
                            setLastName(e.target.value)
                        }}
                        placeholder="Last name"
                        />
                    </div>

                    <h3 className="text-lg font-medium mb-2">What's your email?</h3>
                    <input 
                    className="bg-[#eeeeee] mb-6 rounded w-full px-4 py-2 border text-lg placholder:text-base"
                    type="email"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    required 
                    placeholder="youremail@example.com"
                    />

                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input 
                    className="bg-[#eeeeee] mb-6 rounded w-full px-4 py-2 border text-lg placholder:text-base"
                    type="password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    required 
                    placeholder="your password"
                    />

                    <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
                    <div className="flex gap-4 mb-7">
                    <input 
                    className="bg-[#eeeeee] rounded w-full px-4 py-2 border text-lg placholder:text-base"
                    type="text"
                    value={vehicleColor}
                    onChange={(e)=>{
                        setVehicleColor(e.target.value)
                    }}
                    required 
                    placeholder="Vehicle Color"
                    />
                    
                    <input 
                    className="bg-[#eeeeee] rounded w-full px-4 py-2 border text-lg placholder:text-base"
                    type="text"
                    value={vehiclePlate}
                    onChange={(e)=>{
                        setVehiclePlate(e.target.value)
                    }}
                    required 
                    placeholder="Vehicle Plate"
                    />
                    </div>

                    <div className="flex gap-4 mb-7">
                    <input 
                    className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 border text-lg placholder:text-base"
                    type="number"
                    value={vehicleCapacity}
                    onChange={(e)=>{
                        setVehicleCapacity(e.target.value)
                    }}
                    required 
                    placeholder="Vehicle Capacity"
                    />
                    
                    <select 
                    className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                    value={vehicleType}
                    onChange={(e)=>{
                        setVehicleType(e.target.value)
                    }}
                    required 
                    >
                        <option value="">Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="auto">Auto</option>
                        <option value="motorcycle">Moto</option>
                    </select>
                    </div>

                    <button 
                    className="bg-[#111] mb-3 rounded w-full px-4 py-2 text-white font-semibold placholder:text-base cursor-pointer">
                        Create Captain account
                    </button>
                </form>

                <p className="text-center">
                    Already have an account? &nbsp;
                    <Link to='/captainlogin' className="text-blue-600">
                    Login here
                    </Link>
                </p>
            </div>

            <div>
                <p className="text-[10px] leading-tight">
                    This site is protected  by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply.</span>
                </p>
            </div>
        </div>
    )
}

export default CaptainSignup