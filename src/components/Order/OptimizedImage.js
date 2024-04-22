import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const OptimizedImage = ({ src, alt, title }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const img = new Image()

        img.onload = () =>{

            setLoading(false)

        }
        img.src = src
        
    }, [src]);


    return (
        <div >
            {loading ? (
                <Skeleton count={1} style={{ width: '17rem', height: '13rem', borderRadius: '18px' }} className="w-100" />
            ) : (
                <img
                    src={src}
                    alt={alt}
                    title={title}
                    style={{ height: '13rem', borderRadius: '18px' }}
                    className="w-100"
                />
            )}
        </div>
    );
};

export default OptimizedImage;
