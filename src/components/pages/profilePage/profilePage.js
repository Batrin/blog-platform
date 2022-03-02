import React from 'react';
import classes from './profilePage.module.scss';
import EditProfileForm from '../../forms/editProfileForm';

function ProfilePage() {
  return (
    <div className={classes.profile_wrapper}>
      <EditProfileForm />
    </div>
  );
}

export default ProfilePage;
