import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useNavigate,
} from "react-router-dom";

//TODO flip these
import './SignUp.css';
// import '../../App.css';
// import components here
import DynamicButton from "../../components/ButtonComponent";
import DynamicInput from "../../components/InputComponent";
import DropDownMenu from "../../components/DropDownMenu";

// import pages here

function SignUpPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    sex: "",
    phone: "",
    email: "",
    address: "",
    insurance: "",
    idNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleSexChange = (value) => {
    setFormData({ ...formData, sex: value });
  };

  const options = [
    {
      label: "male",
      href: "#option1",
      onClick: () => console.log("male clicked"),
      onClick: () => handleSexChange("male"),
    },
    {
      label: "female",
      href: "#option2",
      onClick: () => console.log("female clicked"),
      onClick: () => handleSexChange("female"),
    },
    // { label: "hb", href: "#option3", onClick: () => console.log("hebrew clicked") },
  ];

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="form-container">
          <label className="block mb-2">Full Name: *</label>
          <DynamicInput
            className="input-field"
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
            placeholder="Enter Full Name"
          />

          <label className="block mb-2">Birth Date: *</label>
          <DynamicInput
            className="input-field"
            type="date"
            value={formData.birthDate}
            name="birthDate"
            onChange={handleChange}
          />

          <label className="block mb-2">Sex: *</label>
          <DropDownMenu
            className="sex-button"
            text={formData.sex || "Select Sex"}
            options={options}
          />

          <label className="block mb-2">Phone: *</label>
          <DynamicInput
            className="input-field"
            type="tel"
            value={formData.phone}
            name="phone"
            onChange={handleChange}
            placeholder="Enter Phone Number"
          />

          <label className="block mb-2">Email: *</label>
          <DynamicInput
            className="input-field"
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder="Enter Email Address"
          />

          <label className="block mb-2">Address: *</label>
          <DynamicInput
            className="input-field"
            type="text"
            value={formData.address}
            name="address"
            onChange={handleChange}
            placeholder="Enter Address"
          />

          <label className="block mb-2">Insurance: *</label>
          <DynamicInput
            className="input-field"
            type="text"
            value={formData.insurance}
            name="insurance"
            onChange={handleChange}
            placeholder="Enter Insurance Information"
          />

          <label className="block mb-2">ID Number: *</label>
          <DynamicInput
            className="input-field"
            type="text"
            value={formData.idNumber}
            name="idNumber"
            onChange={handleChange}
            placeholder="Enter ID Number"
          />

          <DynamicButton
            className="button"
            text="Submit"
            onClick={handleChange}
          />
        </form>
      </div>
      <div>
        <DynamicButton className="button" onClick={goBack} text="Back" />
      </div>
    </div>
  );
}

export default SignUpPage;
