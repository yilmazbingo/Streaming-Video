import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

//-------REUSABLE PART OF THE FORM

class Form extends Component {
  state = { data: {}, errors: {} };

  //this validates the entire form
  validate = () => {
    const options = { abortEarly: false }; //Joi termianates validation once it finds an error
    //this error property is set if we have atleast an error
    const { error } = Joi.validate(this.state.data, this.schema, options);
    //always analyze what we get
    const validation = Joi.validate(this.state.data, this.schema, options);
    console.log(validation);

    if (!error) return null;
    const errors = {};
    // error mesages are populated inside array of error.details.
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      console.log(errors);
      return errors;
    }

    // --------------- WHY THIS IS NOT WORKING ???  ------------------------
    // const x = error.details.map(item => {
    //   errors[item.path[0]] = item.message;
    //   console.log(errors);
    //   return errors;
    // });
    // console.log("cxxx", x);
  };

  //this validates only each input. it will be called when we handle change
  validateProperty = ({ name, value }) => {
    //for validation we need an object and schema
    //property name is whatever name is at runtime. computed property name.
    const object = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(object, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState(() => ({ errors: errors || {} }));
    if (errors) return;
    //this func is for data fetching
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value; //currentTarget returns input field
    this.setState(() => ({ data, errors }));
  };

  renderButton(label) {
    let classes = "btn btn-";
    classes += this.validate() ? "primary" : "success";
    return (
      <button type="submit" className={classes} disabled={this.validate()}>
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
