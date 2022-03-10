import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classes from './profilePage.module.scss';
import EditProfileForm from '../../forms/editProfileForm';

function ProfilePage({ user, updateUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);
  return (
    <div className={classes.profile_wrapper}>
      <EditProfileForm user={user} updateUser={updateUser} />
    </div>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.instanceOf(Object),
  updateUser: PropTypes.func,
};

export default ProfilePage;
