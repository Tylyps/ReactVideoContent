import { Formik } from 'formik';
import React from 'react';
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import "./Register.css";

interface RegisterFormProps {
  toggleView: () => void;
}

const RegisterForm = (props: RegisterFormProps) => {
  const { toggleView } = props;

  return (
    <>
      <h2>
        Register new account
      </h2>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
        }}
        onSubmit={() => {
          console.log("Register!")
        }}
      >
      {({handleSubmit, isSubmitting, errors}) => (
        <>
          <div className="registerFormContainer">
            <CustomInput
              name="username"
              label="Username"
            />
            <CustomInput
              name="email"
              label="Email"
            />
            <CustomInput
              name="password"
              type="password"
              label="Password"
            />
            <CustomInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />
          </div>
          <h4>Already have account? <span
              className="customLink"
              onClick={() => !isSubmitting && toggleView()}
            >
              Sign In
            </span>
          </h4>
          <div>
            <CustomButton
              text="Sign up"
              disabled
              title="Available in premium version"
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
      </Formik>
    </>
  )
}

export default RegisterForm;