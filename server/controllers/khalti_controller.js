const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();
const sk = process.env.secret_key;
const khalti_initiate_url = process.env.khalti_initiate_url;
const khalti_lookup_url = process.env.khalti_lookup_url;

exports.callKhalti = async (formData, req, res) => {
  try {
    const headers = {
      Authorization: `Key ${sk}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(khalti_initiate_url, formData, {
      headers,
    });

    console.log("response hai--", response);
    console.log(response.data);
    console.log(response.data.payment_url);
    // res.redirect(response.data.payment_url);
    res.json({
      message: "khalti success",
      payment_method: "khalti",
      data: response.data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err?.message });
  }
};

exports.handleKhaltiCallback = async (req, res, next) => {
  try {
    const { txnId, pidx, amount, purchase_order_id, transaction_id, message } =
      req.query;
    if (message) {
      return res
        .status(400)
        .json({ error: message || "Error Processing Khalti" });
    }

    const headers = {
      Authorization: `Key ${sk}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(khalti_lookup_url, { pidx }, { headers });

    console.log("handle khalti callback ko response data---", response.data);
    if (response.data.status !== "Completed") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    next();
    // return res.json({ orderId: purchase_order_id });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err?.message || "Error Processing Khalti" });
  }
};
