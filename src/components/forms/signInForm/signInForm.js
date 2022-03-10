import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputTextField from '../../simpleComponents/inputTextField';
import classes from './signInForm.module.scss';
import TemplateButton from '../../simpleComponents/templateButton';
import signInRule from '../../../validationRule/signInRule';
import BlogApi from '../../../api';

const api = new BlogApi();

function SignInForm({ setUser }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to="/articles" />;
  }

  const onSubmit = (data) => {
    const userInfo = {
      user: {
        ...data,
      },
    };
    api
      .signInUser(userInfo)
      .then((res) => {
        setUser(res);
        setRedirect(true);
      })
      .catch(() => {
        setError('email', {
          type: 'email-error',
          message: 'Email is invalid',
        });
        setError('password', {
          type: 'password-error',
          message: 'Password is invalid',
        });
      });
  };

  const { emailRule, password } = signInRule;
  return (
    <form className={classes['sign-in-form']} onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign in</h2>
      <div className={classes['sign-in-form__fields']}>
        <InputTextField
          register={{
            ...register('email', { ...emailRule }),
          }}
          type="text"
          labelText="Email address"
          placeholderText="Email address"
          errors={errors.email}
        />
        <InputTextField
          register={{
            ...register('password', { ...password }),
          }}
          type="password"
          labelText="Password"
          placeholderText="Password"
          errors={errors.password}
        />
      </div>
      <TemplateButton type="submit" label="Login" name="login-button" />
      <div className={classes['sign-in-form__footer']}>
        <p className={classes['sign-in-form__footer-text']}>Don't have an account?</p>
        <Link to="/sign-up">
          <span>Sign up.</span>
        </Link>
      </div>
    </form>
  );
}

SignInForm.propTypes = {
  setUser: PropTypes.func,
};

export default SignInForm;
