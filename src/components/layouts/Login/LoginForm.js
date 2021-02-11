import React from "react";

// EXTERNAL IMPORT
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

// COMPONENT IMPORT
import { authLoginFormAction } from "../../../action/authAction";

function LoginForm({ authLoginFormAction }) {
  // Getting yup validation
  const LoginFormValidationSchema = Yup.object().shape({
    userLoginUserName: Yup.string().required("Username is required"),
    userLoginPassword: Yup.string().required("Password is required"),
  });

  // submitting form
  const submitingUserLogin = (values) => {
    authLoginFormAction(values);
  };

  return (
    <Formik
      initialValues={{
        userLoginUserName: "",
        userLoginPassword: "",
      }}
      validationSchema={LoginFormValidationSchema}
      onSubmit={(values, { resetForm }) => submitingUserLogin(values)}
    >
      {({ errors, touched, values, resetForm }) => (
        <Form className="mt-16 px-10 mb-32">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <Field
                className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                placeholder="Username"
                id="userLoginUserName"
                name="userLoginUserName"
                type="text"
              />
              {errors.userLoginUserName && touched.userLoginUserName ? (
                <small className="text-sm text-companyYello text-left">
                  {errors.userLoginUserName}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col space-y-2">
              <Field
                className="px-5 py-2 bg-transparent border border-gray-100 rounded-full text-white focus:outline-none focus:text-white"
                placeholder="Password"
                id="userLoginPassword"
                name="userLoginPassword"
                type="password"
              />
              {errors.userLoginPassword && touched.userLoginPassword ? (
                <small className="text-sm text-companyYello text-left">
                  {errors.userLoginPassword}
                </small>
              ) : null}
            </div>
            <button
              type="submit"
              className="bg-third text-white font-bold text-xl py-2 px-5 rounded-full hover:bg-companyYello hover:text-secondary"
            >
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    authLoginFormAction: (credentials) =>
      dispatch(authLoginFormAction(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
