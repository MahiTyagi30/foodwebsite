import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material-next/Badge";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT } from "../redux/actions/action";
import myImage from "../images/SpiceTrail__1_-removebg-preview.png";
// import { setSearchQuery } from '../redux/actions/action';
// import ScriptComponent from '../script'
import greem from "../images/greentick-removebg-preview.png";
import { clearCart } from "../redux/actions/action";

import { Howl } from "howler"; // Import the Howl class

const Header = () => {
  const [price, setPrice] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };
  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  const buttonClickSound = new Howl({
    src: [process.env.PUBLIC_URL + "/sound/service-bell-ring-14610.mp3"],
    preload: true,
  });

  const handleOrderClick = () => {
    buttonClickSound.play();
    // console.log("sound palyed")
    // Set showSuccessMessage to true when the button is clicked
    setShowSuccessMessage(true);
    dispatch(clearCart());

    // You can also reset it after a delay if needed
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{ height: "60px" }}
        className="fixed-top"
      >
        <NavLink to="/" className="text-decoration-none text-light mx-3">
          <img src={myImage} style={{ width: "100px" }} />
        </NavLink>
        <Nav className="mr-auto">
          <NavLink to="/" className="text-decoration-none text-light">
            Home
          </NavLink>
        </Nav>

        {showSuccessMessage && (
          <div id="successMessage">
            <img
              src={greem}
              alt="Green Tick"
              style={{ width: "60px", height: "50px" }}
            />
            <p style={{ color: "white", marginTop: "10px" }}>
              Your order has been placed successfully!
            </p>
          </div>
        )}
        <Form inline className="form-search">
          <FormControl type="text" placeholder="Search" className="search" />
          <Button variant="outline-info" className="search-btn">
            Search
          </Button>
        </Form>

        <Badge
          badgeContent={getdata.length}
          color="primary"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <i
            class="fa-solid fa-cart-shopping text-light"
            style={{ fontSize: "25", cursor: "pointer" }}
          ></i>
        </Badge>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length > 0 ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thread>
                  <tr>
                    <th>Photo</th>
                    <th>Restraunt Name</th>
                  </tr>
                </thread>
                <tbody>
                  {getdata.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.imgdata}
                                style={{ width: "5rem", height: "5rem" }}
                                alt=""
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price : ₹{e.price}</p>
                            <p>Quantity : {e.qnty}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: "20",
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e.id)}
                            >
                              <i class="fa-solid fa-trash smalltrash"></i>
                            </p>
                          </td>
                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: "20",
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            <i class="fa-solid fa-trash largetrash"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center"> Total : ₹{price}</p>
                  <Button
                    variant="primary"
                    size="lg"
                    style={{ margin: "20px", width: "170px" }}
                    onClick={handleOrderClick}
                  >
                    Place Order
                  </Button>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_deatails d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                class="fa-solid fa-xmark smallclose"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
              ></i>
              <p className="m-2" style={{ fontSize: 22 }}>
                your cart is empty
              </p>
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};
export default Header;
