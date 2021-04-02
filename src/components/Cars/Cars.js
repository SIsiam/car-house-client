import { LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Car from '../Car/Car';


const CarBrand = () => {
    const [cars, setCars] = useState([])
    useEffect(() => {
        fetch('https://lychee-sundae-99395.herokuapp.com/BookCars')
            .then(res => res.json())
            .then(data => {
                setCars(data)
                console.log(data)
            })
    }, [])
    return (
        <div className="car-container">

            {
                cars.length === 0 && <LinearProgress color="secondary" />

            }
            <div className="search m-5">
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search Your Favourite Car" aria-label="Search" />
                </form>
            </div>


            <div className='container-fluid'>
                <div className="row row-cols-1 row-cols-md-3 col-xs-6 ">
                    {
                        cars.map(car => <Car key={car._id} car={car}></Car>)
                    }
                </div>
            </div>
        </div >
    );
};

export default CarBrand;