import React from "react";

const Review = ({ setForm, formData, navigation }) => {
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    token,
    scheme,
    last4,
  } = formData;
  const { go } = navigation;

  const pay = async () => {
    // we have the express server running on the same port
    const serverURL = window.location.href + "pay";
    const payment = await fetch(serverURL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        name: `${firstName} ${lastName}`,
        billing: {
          address_line1: address,
          city: city,
          state: state,
          zip: zip,
        },
      }),
    });
    const response = await payment.json();
    alert(`Payment ${response.response_summary}`);
    console.log(response);
  };

  return (
    <div className="form">
      <h3>Review your data</h3>
      <h4>Name</h4>
      <div>Full: {`${firstName} ${lastName}`}</div>
      <h4>Address</h4>
      <div>
        Address: {`${address}`},
        <br />
        City: {` ${city}`},
        <br />
        State: {`${state}`},
        <br />
        ZIP: {`${zip}`}
      </div>
      <h4>Payment Details</h4>
      <div>
        Scheme: {`${scheme}`},
        <br />
        Card: {`${last4}`}
      </div>
      <div>
        <button onClick={pay}>Submit</button>
      </div>
    </div>
  );
};

export default Review;
