import React from 'react';
import PropTypes from 'prop-types';
import classes from './signInPage.module.scss';
import SignInForm from '../../forms/signInForm';

function SignInPage({ formSubmit }) {
  return (
    <div className={classes['sign-in-page']}>
      <SignInForm formSubmit={formSubmit} />
    </div>
  );
}

SignInPage.propTypes = {
  formSubmit: PropTypes.func,
};

export default SignInPage;
