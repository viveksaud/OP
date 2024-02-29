// const orderService = require('../../server/services/order_services')
// const axios = require("axios");
// const crypto = require("crypto");
// const { callKhalti } = require("../../server/controllers/khalti_controller");

const create = async (params, credentials, order) => {
  try {
    console.log(params);
    console.log(params.userId);
    console.log(credentials);
    console.log(credentials.t);
    console.log(order);
    console.log(token);
    

    let response = await fetch('/api/orders/'+params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({order: order})
      })
      console.log(response);
      return response.json()
    }catch(err) {
      console.log(err)
    }

  // const createOrder = async (req, res) => {
  // try {
  //   console.log(req.body);
  //   const order = await orderService.save(req.body);
  //   const signature = this.createSignature(
  //     `total_amount=${order.amount},transaction_uuid=${order._id},product_code=EPAYTEST`
  //   );
  //   if (order.payment_method === "esewa") {
  //     const formData = {
  //       amount: order.amount,
  //       failure_url: "http://localhost:3000",
  //       product_delivery_charge: "0",
  //       product_service_charge: "0",
  //       product_code: "EPAYTEST",
  //       signature: signature,
  //       signed_field_names: "total_amount,transaction_uuid,product_code",
  //       success_url: "http://localhost:3000/api/esewa/success",
  //       tax_amount: "0",
  //       total_amount: order.amount,
  //       transaction_uuid: order._id,
  //     };
  //     res.json({
  //       message: "Order Created Sucessfully",
  //       order,
  //       payment_method: "esewa",
  //       formData,
  //     });
  //   } else if (order.payment_method === "khalti") {
  //     const formData = {
  //       return_url: "http://localhost:3000/api/khalti/callback",
  //       website_url: "http://localhost:3000",
  //       amount: order.amount * 100, //paisa
  //       purchase_order_id: order._id,
  //       purchase_order_name: "test",
  //     };

  //     callKhalti(formData, req, res);
  //   }
  // } catch (err) {
  //   return res.status(400).json({ error: err?.message || "No Orders found" });
  // }
};


const listByShop = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/orders/shop/" + params.shopId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, product) => {
  try {
    let response = await fetch("/api/order/status/" + params.shopId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(product),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const cancelProduct = async (params, credentials, product) => {
  try {
    let response = await fetch(
      "/api/order/" + params.shopId + "/cancel/" + params.productId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: JSON.stringify(product),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const processCharge = async (params, credentials, product) => {
  try {
    let response = await fetch(
      "/api/order/" +
        params.orderId +
        "/charge/" +
        params.userId +
        "/" +
        params.shopId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: JSON.stringify(product),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getStatusValues = async (signal) => {
  try {
    let response = await fetch("/api/order/status_values", {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByUser = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/orders/user/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/order/" + params.orderId, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  create,
  listByShop,
  update,
  cancelProduct,
  processCharge,
  getStatusValues,
  listByUser,
  read,
  // createOrder,
};
