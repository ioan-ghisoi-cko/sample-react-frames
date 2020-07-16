import React, { useState } from "react";
import { Frames, CardNumber, ExpiryDate, Cvv } from "johnny-tools-frames-react";

import "./frames-style.css";

const Payment = ({ setForm, formData, navigation }) => {
  const { token, scheme, last4 } = formData;
  const { previous, next } = navigation;

  const [loading, setLoading] = useState("true");

  return (
    <div className="form">
      <h3>Payment</h3>
      <p>{loading ? "Loading..." : ""}</p>
      <div className="payment-area">
        <Frames
          config={{
            debug: true,
            publicKey: "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a",
            localization: {
              cardNumberPlaceholder: "Card number",
              expiryMonthPlaceholder: "MM",
              expiryYearPlaceholder: "YY",
              cvvPlaceholder: "CVV",
            },
            style: {
              base: {
                fontSize: "17px",
              },
            },
          }}
          ready={() => {
            setLoading(false);
          }}
          cardTokenized={(e) => {
            setForm({
              target: {
                name: "token",
                value: e.token,
              },
            });
            setForm({
              target: {
                name: "scheme",
                value: e.scheme,
              },
            });
            setForm({
              target: {
                name: "last4",
                value: e.last4,
              },
            });

            // go to next page
            next();
          }}
        >
          <CardNumber />
          <div className="date-and-code">
            <ExpiryDate />
            <Cvv />
          </div>
        </Frames>
      </div>
      <div>
        <button onClick={previous}>Previous</button>
        <button
          onClick={() => {
            Frames.submitCard();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Payment;
