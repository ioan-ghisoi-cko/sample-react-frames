import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Names from "./Names";
import Address from "./Address";
import Payment from "./Payment";
import Review from "./Review";
import Submit from "./Submit";

import "./styles.css";

const steps = [
  { id: "names" },
  { id: "address" },
  { id: "payment" },
  { id: "review" },
  { id: "submit" },
];

const defaultData = {
  firstName: "Jane",
  lastName: "Doe",
  address: "200 South Main St",
  city: "Anytown",
  state: "CA",
  zip: "90505",
  token: "",
  scheme: "",
  last4: "",
};

const MultiStepForm = ({ images }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "names":
      return <Names {...props} />;
    case "address":
      return <Address {...props} />;
    case "payment":
      return <Payment {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;
