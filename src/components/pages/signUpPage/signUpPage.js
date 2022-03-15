import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './signUpPage.module.scss';
import SignUpForm from '../../forms/signUpForm';

function SignUpPage({ user, setUser }) {
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <div className={classes['sign-up__wrapper']}>
      <SignUpForm setUser={setUser} />
    </div>
  );
}

SignUpPage.propTypes = {
  user: PropTypes.instanceOf(Object),
  setUser: PropTypes.func,
};

export default SignUpPage;
