import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import classes from './signUpForm.module.scss';
import InputTextField from '../../simpleComponents/inputTextField';
import CustomCheckbox from '../../simpleComponents/customCheckbox/customCheckbox';
import TemplateButton from '../../simpleComponents/templateButton';
import signUpRule from '../../../validationRule/signUpRule';
import BlogApi from '../../../api';

const api = new BlogApi();

function SignUpForm() {
  const { userName, email, password, repeatPassword, checkbox } = signUpRule;
  const [isRegistered, setRegistered] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      user: {
        username: data.username,
        password: data.password,
        email: data.email,
      },
    };
    return api.signUpUser(userInfo).then(() => {
      reset();
      setRegistered(true);
    });
  };

  const successMessage = isRegistered ? <Alert severity="success">Registration success</Alert> : null;
  return (
    <form className={classes['sign-up-form']} onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new account</h2>
      <div className={classes['sign-up-form__fields']}>
        <InputTextField
          register={{
            ...register('username', { ...userName }),
          }}
          type="text"
          labelText="Username"
          placeholderText="Username"
          errors={errors.username}
        />
        <InputTextField
          register={{
            ...register('email', { ...email }),
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
        <InputTextField
          register={{
            ...register('repeatPassword', { ...repeatPassword(getValues('password')) }),
          }}
          type="password"
          labelText="Repeat Password"
          placeholderText="Password"
          errors={errors.repeatPassword}
        />
      </div>
      <div className={classes['sign-up-form__footer']}>
        <CustomCheckbox
          labelText="I agree to the processing of my personal
          information"
          register={{
            ...register('checkbox', { ...checkbox }),
          }}
          errors={errors.checkbox}
        />
        <TemplateButton type="submit" name="sign-up-button" label="Create" />
        <div className={classes['sign-up-form__footer-text']}>
          <p>Already have an account?</p>
          <Link to="/sign-in">
            <span>Sign in.</span>
          </Link>
        </div>
      </div>
      {successMessage}
    </form>
  );
}

export default SignUpForm;
