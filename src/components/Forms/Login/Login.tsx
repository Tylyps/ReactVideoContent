import { Formik } from 'formik';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SignInModel } from '../../../models/signIn';
import { useStore } from '../../../stores/store';
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import Loading from '../../Loading/Loading';
import "./Login.css";

interface LoginFormProps {
  toggleView: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const { toggleView } = props;
  const history = useHistory();
  const { userStore } = useStore();

  const signIn = useCallback((loginData: SignInModel) => {
    return userStore.login(loginData);
  }, [userStore])

  const sighInAnonymously = useCallback(() => {
    userStore.loginAnonymously();
  }, [userStore])

  return (
    <>
      <h2>
        Sign In
      </h2>
      <Formik
        initialValues={{
          Username: "test@bsgroup.eu",
          Password: "Test12!@",
          error: "",
        }}
        onSubmit={(val, { setErrors }) => {
          signIn(val).then(() => {

          }, (e) => {
            setErrors({error: e.message})
          })
        }}
      >
        {({handleSubmit, isSubmitting, errors, setSubmitting}) => (
          <>
          <div className="loginFormContainer">
            <CustomInput
              name="Username"
              label="Username"
              hasError={!!errors?.error}
            />
            <CustomInput
              name="Password"
              type="password"
              label="Password"
              hasError={!!errors?.error}
            />
          </div>
          <h4>Don't have account? <span
            className="customLink"
            onClick={() => !isSubmitting && toggleView()}
            >
              Register
            </span>
          </h4>
          <Loading
            show={isSubmitting}
          />
          <div>
            <CustomButton
              text="Sign In Anonymously"
              onClick={() => {
                setSubmitting(true);
                sighInAnonymously();
              }}
              disabled={isSubmitting}
            />
            <CustomButton
              text="Sign In"
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
          </div>
        </>
        )}
      </Formik>
    </>
  )
}

export default LoginForm;