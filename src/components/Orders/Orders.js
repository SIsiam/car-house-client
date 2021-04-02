import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './Order.css'

const Orders = () => {
    document.title = "Car House - Orders";
    const [loggedInUser] = useContext(UserContext);
    const [orderData, setOrderData] = useState([])
    const history = useHistory()


    const cancleOrder = id => {
        fetch(`https://lychee-sundae-99395.herokuapp.com/cancleOrder/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
        history.push('/Home')
    }
    useEffect(() => {
        fetch(`https://lychee-sundae-99395.herokuapp.com/orders?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOrderData(data)
            })
    }, [])
    return (


        <div className="order-container">
            <div className='container'>
                <Header />
                {
                    orderData.length > 0 ? <div className='d-flex'>
                        <div className='row'>
                            {
                                orderData.map(data =>
                                    <div key={data._id} className="card selected-order m-2" style={{ borderRadius: '5px', }}>
                                        <div className="row no-gutters">
                                            <div className="col-sm-5">
                                                <img className="card-img" style={{ width: '100%', height: '100%' }} src={data.yourOrder.imageURL} alt="" />
                                            </div>
                                            <div className="col-sm-7">
                                                <div className="card-body">
                                                    <h5 className="card-title">Car Name : {data.yourOrder.name}</h5>
                                                    <p className="card-title" > Author : {data.yourOrder.Author}</p>
                                                    <p className="card-title" > Price : ${data.yourOrder.Price}</p>
                                        from: {(new Date(data.checkIn).toDateString('dd/MM/yyyy'))} to: {(new Date(data.checkOut).toDateString('dd/MM/yyyy'))}
                                                    <h5>User Information</h5>
                                                    <p>{data.email} </p>
                                                    <p>{data.name} </p>
                                                    <div className=''>
                                                        <button type="button" className="btn btn-outline-success btn-lg btn-block" onClick={() => cancleOrder(data._id)} >Cancle Order</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                        :
                        <div className="d-flex justify-content-center align-items-center m-5 text-danger">
                            <h2>Loading ....</h2>  <CircularProgress color="secondary" />

                        </div>
                }
            </div>
        </div>

    );
};

export default Orders;