import React from "react";
import { Field, reduxForm } from "redux-form";
//Field is a react component. that is why it is capital letter
//reduxForm is a function. it is same as redux connect()

class StreamForm extends React.Component {
  //error and touched are passed to the props.meta
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //if we use "this" inside method, should be arrow function. because "this" here will always point to the renderError
  // input.onChange. console.log(input) to see it.
  renderInput = ({ input, label, meta }) => {
    //classname "error" highlights the error field with red
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  //this is called with whatever values our Fields have
  //this where redux-form allows us what to do with the form.
  //it will always comes from parent components
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    // handleSubmit is passed by the reduxForm and it already prevents default
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        {/* by default semantic ui does not show error messages. so we add "error" */}

        {/* name prop is a required prop. redux-form checks here to pass the error properties */}
        {/* Field is just a component. it does not know what to show on the screen */}
        {/* "label" prop is passed to the renderInput. by default anythign we pass to the field will be added as prop */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        {/*Field is going to call "this.renderInput" function */}
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  //we have to return an object, so redux form will rerenders when the object changes
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

//since we wrapped the cmomponent with reduxForm, props that passed to this component will be passed to the reduxForm
//reduxForm then passes those props onto our component throuhg initialValues
//if we pass some initial values  from streamEdit, it will be attached to initialValues
export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
//connecting to reduxForm will pass alot of props to the component
//all the data related to this form will have "streamForm" key value in the redux store. streamForm is the name fo the form.

//react form will check the field name and validate object properties. if a property and name mathces, redux form will pass it as prop to the renderInput()
//error will be attached to the "props.meta"
