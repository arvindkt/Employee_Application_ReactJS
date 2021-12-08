import React, { useState, useEffect } from 'react';
import {
  Form,
  FormField,
  GridRow,
  GridCol,
  Card,
  Heading
} from '@athena/forge';
import {Link} from '@reach/router';
import '@athena/forge/static/css/forge.css';
import { useAuth } from '../context/Auth';


function Signup (){

  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ touched, setTouched ] = useState({});
  const {register,message, setMessage} = useAuth();
  
  useEffect(() => {
    setMessage("");
}, [])
  
  function validate(){
    const validationErrors = {};
    if (!values.firstName){
      validationErrors.firstName = 'You have not entered a first name';
    }
    if (!values.lastName){
      validationErrors.lastName = 'You have not entered a last name';
    }
    if (!values.userName){
      validationErrors.userName = 'You have not entered a user name';
    }
    if (!values.email){
      validationErrors.email = 'You have not entered an email address';
    }
    else if (!/\S+@\S+.\S+/.test(values.email)){
      validationErrors.email = 'Email address should match the format "person@domain.com"';
    }
    if(!values.password){
      validationErrors.password = 'You have not entered a password';
    }
    else if(values.password.length < 5){
      validationErrors.password = 'Password should be minimum 6 letters';
    }
    if(!values.phoneNo){
      validationErrors.phoneNo = 'You have not entered a phone number';
    }
    if(!values.confirmpassword){
      validationErrors.confirmpassword = 'You have not entered a confirmed password';
    }
    else if(values.confirmpassword !== values.password){
      validationErrors.confirmpassword = "Password does not match ";
    }
    return validationErrors;
  }

  function handleChange(event){
    const name = event.target.id;
    const value = event.target.value;
    setValues( previousValues => ({ ...previousValues, [name]: value }) );
    if (!touched[name]){
      setTouched( previousTouched => ({ ...previousTouched, [name]: true }) );
    }
  }

  function handleBlur(event){
    const name = event.target.id;
    if (touched[name]){
      const formErrors = validate(values);
      console.log(formErrors);
      setErrors(previousErrors => ({ ...previousErrors, [name]: formErrors[name] }));
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    const formErrors = validate(values);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0){
      register(values,'/home');
    }
    else {
      //focus first error
      // form.elements is represented differently in Edge vs other modern browsers.
      // This iteration style handles both.
      for (const i in document.forms[0].elements) {
        const input = document.forms[0].elements[i];
        if (formErrors[input.id]) {
          input.focus();
          break;
        }
      }
    }
  }
  
  return (
    
    <div className="fe_f_all grid-demo fe_u_padding--large">
       <Heading headingTag="h3" variant="page" text="Employee application" />
   <GridRow>
		<GridCol width={{ small: 6 }}>
   
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		</GridCol>
		<GridCol width={{ small: 6 }}>
      <Card>
      <Heading text="Employee signup" variant="section" headingTag="h1" className="fe_u_padding--left-large" />

		<p style ={{'color' :'green'}}> 
			{message &&  <strong> {message} </strong> }
		</p>
		<Form onSubmit={handleSubmit} buttonText="Sign up" labelWidth={3} layout = 'compact'>
			
			<FormField
			labelText="First name"
      id="firstName"
      type ="text"
			value={values.firstName || ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.firstName || ''}
			required
			/>
			<FormField
			labelText="Last name"
      id="lastName"
      type ="text"
			value={values.lastName || ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.lastName || ''}
			required
			/>
      <FormField
			labelText="User name"
      id="userName"
      type ="text"
			value={values.userName || ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.userName || ''}
			required
			/>
			<FormField
			labelText="Email"
			id="email"
			type="email"
			value={values.email || ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.email || ''}
			required
			/>
		<FormField
			labelText="Phone Numer"
			id="phoneNo"
			type="text"
			value={values.phoneNo || ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.phoneNo || ''}
			required
			/>
			<FormField
			labelText="Password"
			id="password"
			type="password"
			value={values.password || ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.password || ''}
			required
			/>
			<FormField
			labelText="Confirm Password"
			id="confirmpassword"
			type="password"
			value={values.confirmpassword || ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors.confirmpassword || ''}
			required
			/>
		</Form>
		<strong>Already a member? <Link to='/'> Log In</Link></strong>
    </Card>
		</GridCol>
	</GridRow>
</div>
  );
}

export default Signup;