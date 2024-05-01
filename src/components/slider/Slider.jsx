import './Slider.css';
import React, { useState, useEffect } from 'react';

const Slider = ({ imageUrls }) => {
    const [slideCurrent, setSlideCurrent] = useState(0);
    const [slidesArr, setSlidesArr] = useState([]);

    useEffect(() => {
        setSlidesArr(imageUrls.map(url => ({ imageUrl: url })));
        console.log(slidesArr)
    }, [imageUrls]);

    const goToNextSlide = () => {
        if (slideCurrent < slidesArr.length - 1) {
            setSlideCurrent(prevSlide => prevSlide + 1);
            console.log(slideCurrent)
        }
    };

    const goToPrevSlide = () => {
        if (slideCurrent > 0) {
            setSlideCurrent(prevSlide => prevSlide - 1);
            console.log(slideCurrent)
        }
    };

    return (
        <div className="slider-ctr">
            <div className="slides">
                {slidesArr.map((slide, index) => (
                    <figure
                        key={index}
                        className={`slide ${index === slideCurrent ? 'slide-on' : ''}`}
                    >
                        <img src={slide.imageUrl} alt={`Slide ${index}`} />
                    </figure>
                ))}
            </div>
            <div className="slider-control">
                <div className={`control prev ${slideCurrent === 0 ? 'disabled' : ''}`} onClick={goToPrevSlide}>
                    <div className="icon ion-chevron-left"></div>
                </div>
                <div className={`control next ${slideCurrent === slidesArr.length - 1 ? 'disabled' : ''}`} onClick={goToNextSlide}>
                    <div className="icon ion-chevron-right"></div>
                </div>
            </div>
        </div>
    );
};

export default Slider;