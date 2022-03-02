import React from 'react';
import classes from './signUpPage.module.scss';
import SignUpForm from '../../forms/signUpForm';

function SignUpPage() {
  return (
    <div className={classes['sign-up__wrapper']}>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
