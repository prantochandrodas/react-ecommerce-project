import React from 'react';
import './Hero.css'
import handIcon from '../Assets/hand_icon.png'
import arrow from '../Assets/arrow.png'
import hero_img from '../Assets/hero_image.png'
const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h1>NEW ARRIVALS ONLY</h1>
                <div>
                    <div className="hand-hand-icon">
                        <p>new</p>
                        <img src={handIcon} alt="" />
                    </div>
                    <p>Collections</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-bth">
                    <div>Latest Collection</div>
                    <img src={arrow} alt="" />
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_img} alt="" />
            </div>
        </div>
    );
};

export default Hero;