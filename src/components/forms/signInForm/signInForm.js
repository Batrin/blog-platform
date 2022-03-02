import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import InputTextField from '../../simpleComponents/inputTextField';
import classes from './signInForm.module.scss';
import TemplateButton from '../../simpleComponents/templateButton';
import signInRule from '../../../validationRule/signInRule';

function SignInForm({ formSubmit }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { emailRule, password } = signInRule;
  return (
    <form className={classes['sign-in-form']} onSubmit={handleSubmit(formSubmit)}>
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
      <TemplateButton type="submit" onButtonClick={() => {}} label="Login" name="login-button" />
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
  formSubmit: PropTypes.func,
};

export default SignInForm;
