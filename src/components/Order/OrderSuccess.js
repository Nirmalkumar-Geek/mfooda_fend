import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import shoppingCartAnimation from './success.json';
import { CContainer } from '@coreui/react';
import { Navigate } from 'react-router-dom';

export default function OrderSuccess() {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: shoppingCartAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const delay = 5000; 
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, delay);

        
        return () => clearTimeout(timer);
    }, []); 

    return (
        <div>
            <CContainer className='text-center'>
                <Lottie
                    options={defaultOptions}
                    height={400}
                    width={200}
                    
                />
                {isLoaded && (
                    <Navigate to='/orders' />
                )}
            </CContainer>
        </div>
    );
}
