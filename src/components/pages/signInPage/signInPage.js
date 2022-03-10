import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classes from './signInPage.module.scss';
import SignInForm from '../../forms/signInForm';

function SignInPage({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <div className={classes['sign-in-page']}>
      <SignInForm setUser={setUser} />
    </div>
  );
}

SignInPage.propTypes = {
  setUser: PropTypes.func,
  user: PropTypes.instanceOf(Object),
};

export default SignInPage;
