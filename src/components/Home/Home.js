import React from 'react';
import Cars from '../Cars/Cars';
import Header from '../Header/Header';

const Home = () => {
    document.title = "Car House";
    return (
        <div>
            <Header />
            <Cars />
        </div>
    );
};

export default Home;