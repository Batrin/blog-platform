import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import classes from './signUpForm.module.scss';
import InputTextField from '../../simpleComponents/inputTextField';
import CustomCheckbox from '../../simpleComponents/customCheckbox/customCheckbox';
import TemplateButton from '../../simpleComponents/templateButton';
import BlogApi from '../../../api';

const api = new BlogApi();

function SignUpForm() {
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required('Required field')
      .min(3, 'Min length 3 characters')
      .max(20, 'Max length 20 characters'),
    email: Yup.string()
      .required('Required field')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Uncorrectly email'),
    password: Yup.string()
      .required('Required field')
      .min(6, 'Min length 3 characters')
      .max(40, 'Max length 40 characters'),
    repeatPassword: Yup.string()
      .required('Required field')
      .oneOf([Yup.ref('password')], 'Passwords must and should match'),
    checkbox: Yup.boolean().oneOf([true], ''),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const [isRegistered, setRegistered] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm(validationOpt);

  const onSubmit = (data) => {
    const userInfo = {
      user: {
        username: data.username,
        password: data.password,
        email: data.email,
      },
    };
    return api
      .signUpUser(userInfo)
      .then(() => {
        reset();
        setRegistered(true);
      })
      .catch((err) => {
        const errObj = err.errors;
        for (const errKey in errObj) {
          setError(errKey, {
            type: 'server-error',
            message: errObj[errKey],
          });
        }
      });
  };

  const successMessage = isRegistered ? <Alert severity="success">Registration success</Alert> : null;
  return (
    <form className={classes['sign-up-form']} onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new account</h2>
      <div className={classes['sign-up-form__fields']}>
        <InputTextField
          register={{
            ...register('username'),
          }}
          type="text"
          labelText="Username"
          placeholderText="Username"
          errors={errors.username}
        />
        <InputTextField
          register={{
            ...register('email'),
          }}
          type="text"
          labelText="Email address"
          placeholderText="Email address"
          errors={errors.email}
        />
        <InputTextField
          register={{
            ...register('password'),
          }}
          type="password"
          labelText="Password"
          placeholderText="Password"
          errors={errors.password}
        />
        <InputTextField
          register={{
            ...register('repeatPassword'),
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
            ...register('checkbox'),
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
