import React from 'react';
import Product from './Product.js';
import './Home.css'
import { v4 as uuidv4 } from 'uuid';

const Home = () => { 
    return ( 
        <div className="home">
            <div className="home-container">
                <img 
                    className="home-image"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/2020/Other/TWAR_2021_UPDATED_3000x1200_GlowChrisSoloNoGun_TH_Post_1PV_en-US_ARSDE_1Movie._CB664041153_.jpg" 
                />
                <div className="home-row">
                    <Product
                        id={uuidv4()}
                        title="Molten Beach Volleyball"
                        price={29.99}
                        image="https://m.media-amazon.com/images/I/91nHUlcmLYL._AC_SX679_.jpg"
                        rating={5}
                    />
                    <Product
                        id={uuidv4()}
                        title="Fire TV Stick 4K streaming device with Alexa Voice Remote (includes TV controls) | Dolby Vision"
                        price={37.99}
                        image="https://m.media-amazon.com/images/I/61mAA2BB-FL._AC_SX569_.jpg"
                        rating={5}
                    />
                </div>
                <div className="home-row">
                    <Product
                        id={uuidv4()}
                        title='All-new Fire HD 10 tablet, 10.1", 1080p Full HD, 32 GB, latest model (2021 release), Black'
                        price={149.99}
                        image="https://m.media-amazon.com/images/I/61uE03cRsyS._AC_SX679_.jpg"
                        rating={5}
                    />
                    <Product
                        id={uuidv4()}
                        title="PlayStation DualSense Wireless Controller – Midnight Black"
                        price={69.00}
                        image="https://m.media-amazon.com/images/I/61O9tWR6WDS._SX522_.jpg"
                        rating={5}
                    />
                    <Product
                        id={uuidv4()}
                        title="I Alone Can Fix It: Donald J. Trump's Catastrophic Final Year Hardcover – July 20, 2021"
                        price={18.93}
                        image="https://images-na.ssl-images-amazon.com/images/I/41ItBEAc3kS._SX327_BO1,204,203,200_.jpg"
                        rating={5}
                    />
                </div>
                <div className="home-row">
                    <Product
                        id={uuidv4()}
                        title="VISHARK Sunglasses Women Trendy Polarized UV Protection Sunglasses For Women Men Cool Designer Round Retro Sun Glasses"
                        price={39.99}
                        image="https://m.media-amazon.com/images/I/51JQoioXYtS._AC_UX679_.jpg"
                        rating={5}
                    />
                </div>  
            </div>
        </div>
    );
}
 
export default Home;