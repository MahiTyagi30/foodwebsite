import React, { useEffect, useState } from 'react';
import green from './images/greentick-removebg-preview.png'


export const ScriptComponent = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleOrderClick = () => {
        setShowSuccessMessage(true);
    };

    return (
        <div>
            <button id="orderButton" onClick={handleOrderClick}>Place Order</button>
            {showSuccessMessage && (
                <div id="successMessage">
                    <img src={green} alt="Green Tick" />
                    <p>Your order has been placed successfully!</p>
                </div>
            )}
        </div>
    );
};
