import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import deletePic from '../Images/delete.gif'
import AddIcon from '@material-ui/icons/Add';
import ListAltIcon from '@material-ui/icons/ListAlt';
import "./Admin.css";
import { useHistory } from 'react-router';
import Header from '../Header/Header';


const Admin = () => {
    document.title = "Car House - Admin";
    const [allCars, setAllCars] = useState([]);
    const history = useHistory()
    useEffect(() => {
        fetch(`https://lychee-sundae-99395.herokuapp.com/BookCars`)
            .then(res => res.json())
            .then(data => {
                setAllCars(data)
                console.log('my data', data)
            })

    }, [])

    const deleteCar = (_id) => {
        const URL = `https://lychee-sundae-99395.herokuapp.com/BookCars/${_id}`
        console.log(URL);
        fetch(URL, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
        alert('You deleted A Car successfully')
        history.push('/Home')
    }
    return (
        <div>
            <Header />
            <div className="Admin">

                <div id="mySidenav" class="sidenav">
                    <Link to='/Admin'>
                        <div id="about" className="d-flex justify-content-center">
                            <ListAltIcon /> <p>Manage Car</p>
                        </div>
                    </Link>
                    <Link to="AddCar">
                        <div id="blog" className="d-flex justify-content-center">
                            <AddIcon />  <p>Add Car</p>
                        </div>
                    </Link>
                </div>
                <h4 className="d-flex justify-content-center">Add Car</h4>
                <table className="table Admin-table">
                    <thead className="thead">
                        <tr>
                            <th scope="col">Car Name</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allCars.map(user => <tr className="bg-light" key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.Author}</td>
                                <td>{user.Price}</td>
                                <td><img src={deletePic} onClick={() => deleteCar(user._id)} className="bg-danger rounded" style={{ cursor: 'pointer', height: '4vh' }} alt="" /></td>
                            </tr>)
                        }
                    </tbody>
                </table>

            </div>
        </div>


    );
};

export default Admin;