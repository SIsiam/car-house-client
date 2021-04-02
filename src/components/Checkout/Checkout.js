import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory, Link } from 'react-router-dom';
import './Checkout.css'
import { UserContext } from '../../App';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Header from '../Header/Header';
import { Button } from '@material-ui/core';

const Checkout = () => {
    document.title = "Car House - Checkout";
    const { id } = useParams()
    const [selectedCar, setSelectedCar] = useState([])
    const { name, Price } = selectedCar;
    const history = useHistory()
    const { register, handleSubmit } = useForm();
    const [loggedInUser] = useContext(UserContext)
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });
    const { checkIn, checkOut } = selectedDate;



    useEffect(() => {
        const uri = `https://lychee-sundae-99395.herokuapp.com/BookCars/${id}`
        fetch(uri)
            .then(res => res.json())
            .then(data => {
                setSelectedCar(data)
                console.log(data)
            })
    }, [])

    const handleCheckInDate = (date) => {
        const newDates = { ...selectedDate }
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };

    const handleCheckOutDate = (date) => {
        const newDates = { ...selectedDate }
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };

    const onSubmit = data => {
        console.log('form submitted', data)
        const allData = { ...loggedInUser, ...selectedDate, data, yourOrder: selectedCar }
        fetch('https://lychee-sundae-99395.herokuapp.com/AddOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allData)
        })
            .then(res => res.json())
            .then(data => {
                console.log('my chekout data', data);
                if (data) {
                    history.push('/Orders')
                }
            })
    };
    return (
        <div className="checkout-container ">
            <div>
                <Header />
            </div>
            <div className="container">
                <h2>Chekout</h2>
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                    <table class="table table-dark">
                        <thead className="thead-dark ">
                            <tr>
                                <th scope="col">Discription</th>
                                <th scope="col">Quentity</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{name}</td>
                                <td>Quentity : 1 </td>
                                <td>{Price}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="date p-4">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Check In Date"
                                    value={checkIn}
                                    onChange={handleCheckInDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Check Out Date"
                                    format="dd/MM/yyyy"
                                    value={checkOut}
                                    onChange={handleCheckOutDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <br />
                        <hr />
                        <div class="d-flex justify-content-end">
                            <Button size="lg" type="submit"  >Checkout
                    </Button>
                        </div>
                    </div>

                </form>
            </div>



        </div>
    );
};
export default Checkout;