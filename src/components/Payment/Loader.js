import React from 'react';
import Lottie from 'react-lottie';
import shoppingCartAnimation from './loading.json'; // Here import your animation
import { CContainer } from '@coreui/react';

export default function Loader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: shoppingCartAnimation, 
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <CContainer className='text-center'>
                <Lottie
                    options={defaultOptions}
                    height={400}
                    width={200}
                />
            </CContainer>
        </div>
    );
}

