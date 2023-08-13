import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cardsdata from "./CardsData";
import "./style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";
import burger from "../images/burger.jpg";
import greem from "../images/greentick-removebg-preview.png";

const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
  };

  const handleOrderClick = () => {
    setShowSuccessMessage(true);

   
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };



  return (
    
    <div className="container mt-3">
      <h2 className="text-center text-xxl font-weight-bold" style={{marginTop:"80px"}}>SpiceTrail</h2>
     

      <div className="col-sm-12">
        
      </div>

      

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => (
          <Card key={id} style={{ width: "22rem", border: "none" }} className="mx-2 mt-4 card_style">
            <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem" }} className="mt-3" />
            <Card.Body>
              <Card.Title>{element.rname}</Card.Title>
              <Card.Text>Price: ₹ {element.price}</Card.Text>
              <div className="button_div">
                <Button variant="primary" onClick={() => { send(element); handleOrderClick(); }} className="col-lg-12">
                  Add to Cart
                </Button>
                
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cards;
