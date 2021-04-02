import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Car.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 445,
        borderRadius: 20,
        background: "black",
        marginBottom: 25,
    },
    media: {
        height: 300,
        width: 300,
        borderRadius: 10,
        marginTop: 20,
        margin: "auto",
        padding: 20,
    },
    content: {
        color: "white"
    }
});

const Car = ({ car }) => {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={car.imageURL}
                        title="Contemplative Reptile"
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h4">
                            <h3 className="card-title">{car.name}</h3>
                            <p className="card-title "> {car.Author}</p>
                            <h5 className="card-title">Price : ${car.Price}</h5>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className="link-btn">
                    <Button size="lg" >
                        <Link to={"/checkout/" + car._id} className="link-style">
                            Buy Now
                                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default Car;