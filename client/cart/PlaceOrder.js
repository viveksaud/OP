// import React, {useState} from 'react'
// import PropTypes from 'prop-types'
// import {makeStyles} from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Icon from '@material-ui/core/Icon'
// import auth from './../auth/auth-helper'
// import cart from './cart-helper.js'
// import {CardElement, injectStripe} from 'react-stripe-elements'
// import {create} from './../order/api-order.js'
// import {Redirect} from 'react-router-dom'

// const useStyles = makeStyles(theme => ({
//   subheading: {
//     color: 'rgba(88, 114, 128, 0.87)',
//     marginTop: "20px",
//   },
//   checkout: {
//     float: 'right',
//     margin: '20px 30px'
//   },
//   error: {
//     display: 'inline',
//     padding: "0px 10px"
//   },
//   errorIcon: {
//     verticalAlign: 'middle'
//   },
//   StripeElement: {
//     display: 'block',
//     margin: '24px 0 10px 10px',
//     maxWidth: '408px',
//     padding: '10px 14px',
//     boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
//     borderRadius: '4px',
//     background: 'white'
//   }
// }))

// const PlaceOrder = (props) => {
//   const classes = useStyles()
//   const [values, setValues] = useState({
//     order: {},
//     error: '',
//     redirect: false,
//     orderId: ''
//   })

//   const placeOrder = ()=>{
//     props.stripe.createToken().then(payload => {
//       if(payload.error){
//         setValues({...values, error: payload.error.message})
//       }else{
//         const jwt = auth.isAuthenticated()
//         create({userId:jwt.user._id}, {
//           t: jwt.token
//         }, props.checkoutDetails, payload.token.id).then((data) => {
//           if (data.error) {
//             setValues({...values, error: data.error})
//           } else {
//             cart.emptyCart(()=> {
//               setValues({...values, 'orderId':data._id,'redirect': true})
//             })
//           }
//         })
//       }
//   })
// }


//     if (values.redirect) {
//       return (<Redirect to={'/order/' + values.orderId}/>)
//     }
//     return (
//     <span>
//       <Typography type="subheading" component="h3" className={classes.subheading}>
//         Card details
//       </Typography>
//       <CardElement
//         className={classes.StripeElement}
//           {...{style: {
//                         base: {
//                           color: '#424770',
//                           letterSpacing: '0.025em',
//                           fontFamily: 'Source Code Pro, Menlo, monospace',
//                           '::placeholder': {
//                             color: '#aab7c4',
//                           },
//                         },
//                         invalid: {
//                           color: '#9e2146',
//                         },
//                       }
//           }}
//       />
//       <div className={classes.checkout}>
//         { values.error &&
//           (<Typography component="span" color="error" className={classes.error}>
//             <Icon color="error" className={classes.errorIcon}>error</Icon>
//               {values.error}
//           </Typography>)
//         }
//         <Button color="secondary" variant="contained" onClick={placeOrder}>Place Order</Button>
//       </div>
//     </span>)

// }
// PlaceOrder.propTypes = {
//   checkoutDetails: PropTypes.object.isRequired
// }

// export default injectStripe(PlaceOrder)








import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import auth from "./../auth/auth-helper";
import cart from "./cart-helper.js";
import { create } from "./../order/api-order.js";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  subheading: {
    color: "rgba(88, 114, 128, 0.87)",
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

const PlaceOrder =  (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    order: {},
    error: "",
    redirect: false,
    orderId: "",
  });

  const placeOrder = async () => {
    // Replace the Stripe-related logic with your own logic for order placement


 
   // const [orders, setOrders] = useState([]);
    
    // const url = "http://localhost:3000/api/orders/" + params.userId;
    // const handlePayment = async (payment_method) => {
  const url = "http://localhost:3000/api/orders/create";
  // const url = "http://localhost:3000/api/orders/" + params.userId;
  const data = {
    amount: 100,
    products: [{ product: "test", amount: 100, quantity: 1 }],
    payment_method: "khalti",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(data),
    });

    console.log(sessionStorage.getItem("jwt"));
    const jwt = auth.isAuthenticated();
    console.log(jwt.token);

    // const response = axios.post(url, data, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: "Bearer " + `${jwt.token}`,
    //   },
    // });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.payment_method === "esewa") {
        esewaCall(responseData.formData);
      } else if (responseData.payment_method === "khalti") {
        khaltiCall(responseData.data);
      }
    } else {
      console.error("Failed to fetch:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  }
// };

const khaltiCall = (data) => {
  window.location.href = data.payment_url;
};

const esewaCall = (formData) => {
  console.log(formData);
  var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

  var form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", path);

  for (var key in formData) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", formData[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
};

useEffect(() => {
  const getOrders = async () => {
    const url = "http://localhost:3000/api/orders";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setOrders(responseData);
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  getOrders();
}, []);






    const jwt = auth.isAuthenticated();
    create(
      { userId: jwt.user._id },
      { t: jwt.token },
      props.checkoutDetails
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        cart.emptyCart(() => {
          setValues({ ...values, orderId: data._id, redirect: true });
        });
      }
    });
  };

  if (values.redirect) {
    return <Redirect to={"/order/" + values.orderId} />;
  }









  return (
    <span>
      <Typography
        type="subheading"
        component="h3"
        className={classes.subheading}
      >
        Order details
      </Typography>
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
