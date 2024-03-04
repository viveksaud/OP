import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import auth from "./../auth/auth-helper";
import cart from "./cart-helper.js";
import { Redirect, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  subheading: {
    color: "#6420AA",
    marginTop: "20px",
  },
  checkout: {
    float: "right",
    margin: "20px 30px",
  },
  error: {
    display: "inline",
    padding: "0px 10px",
  },
  errorIcon: {
    verticalAlign: "middle",
  },
}));

const PlaceOrder = (props) => {
  console.log(props);
  const classes = useStyles();
  const [values, setValues] = useState({
    error: "",
    redirect: false,
    orderId: "65e1afc4bbe87d13c4ad6a22",
    paymentLink: "", 
  });

  const history = useHistory(); 

  const placeOrder = async () => {
    const jwt = auth.isAuthenticated();
    const userId = jwt.user._id; 

    const data1 = props.checkoutDetails;

    try {
      const response = await axios.post(`/api/orders/${userId}`, data1 );

      const { payment_url } = response.data; 
      window.location.href = payment_url;

      if (response.status === 200) {
        const responseData = response.data;
        const paymentLink = responseData.data.payment_url
        setValues({ ...values, paymentLink }); 
        cart.emptyCart(() => {
          setValues({ ...values, redirect: true });
        });
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (values.paymentLink) {
    window.location.href = values.paymentLink;
    return null; 
  }

  if (values.redirect) {
    return <Redirect to={"/order/" + values.orderId} />;
  }

  return (
    <span>
      <div className={classes.checkout}>
        {values.error && (
          <Typography component="span" color="error" className={classes.error}>
            {values.error}
          </Typography>
        )}
        <Button color="secondary" variant="contained" onClick={placeOrder}>
          Place Order
        </Button>
      </div>
    </span>
  );
};

PlaceOrder.propTypes = {
  checkoutDetails: PropTypes.object.isRequired,
};

export default PlaceOrder;