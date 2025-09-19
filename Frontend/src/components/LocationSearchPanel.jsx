import React from "react";

const LocationSearchPanel = ({suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
    // sample array of locations
    // const locations = [
    //     "THE EMPIRE - Contemporary Serviced Apartment, B 98A, near Unitech Signature Tower, South City 1, Sector 30, Gurugram",
    //     "Hotel Posh Residency, 44P, near, Artemis Hospital Rd, Block C, Uday Nagar, Sector 45, Gurugram, Haryana 122003",
    //     "24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal",
    //     "Hotel Rivlet, near Artemis Hospital, Block G, Sector 42, Gurugram, Haryana 122003"
    // ];

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.description)
        } else if (activeField === 'destination') {
            setDestination(suggestion.description)
        }
    }

    return(
        <div>

            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className="flex gap-4 border-2 p-3 border-gray-50 active: border-black rounded-xl items-center my-2 justify-start">
                        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full"><i className="ri-map-pin-fill"></i></h2>
                        <h4 className="font-medium">{elem.description}</h4>
                    </div>
                ))
            }

        </div>
    )
}

export default LocationSearchPanel;