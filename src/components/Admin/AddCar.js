import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import ListAltIcon from '@material-ui/icons/ListAlt';
import "./Admin.css";

const AddCar = () => {
  document.title="Car House - Add Car";
  const { register, handleSubmit } = useForm();
  const history = useHistory()
  const [imageURL, setIMageURL] = useState(null);
  const onSubmit = data => {

    const eventData = {
      name: data.name,
      Author: data.Author,
      imageURL: imageURL,
      Price: data.price
    };

    console.log(data, eventData);
    const url = `https://lychee-sundae-99395.herokuapp.com/AddCar`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
      .then(res => {
        console.log('server side response', res)
        alert("Car Added SuccessFully")
        history.push('/Home')
      })
  };

  const handleImageUpload = e => {
    console.log(e.target.files[0])
    const imageData = new FormData();
    imageData.set('key', 'b2b2f18b85c3c135d0349cedeebbea1c');
    imageData.append('image', e.target.files[0]);
    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then((res) => {
        console.log(res.data.data.display_url);
        setIMageURL(res.data.data.display_url);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (

    <div className="Add-car">
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
      <div className="col-lg-4 form-container booking-area align-items-center">

        <form onSubmit={handleSubmit(onSubmit)} className="row justify-content-center ">
          <div className="form-group col-lg-10">
            <label >Car Name</label>
            <input
              name="name" required ref={register}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-lg-10 ">
            <label >Author Name</label>
            <input
              name="Author" required ref={register}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-lg-10 ">
            <label >Price</label>
            <input
              name="price" required ref={register}
              type="number"
              className="form-control"
            />
          </div>
          <div className="form-group col-lg-10 ">
            <label>Added Car Cover Photo</label> <br />
            <input
              name="img" type="file"
              onChange={handleImageUpload}
            />
          </div>

          <div className="col-lg-10">
            <input
              type="Submit"
              className="AddCar-btn btn form-control btn-custom"
            />
          </div>
        </form>
      </div>

    </div>

  );
};

export default AddCar;