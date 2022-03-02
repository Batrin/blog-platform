import React from 'react';
import classes from './editProfileForm.module.scss';
import InputTextField from '../../simpleComponents/inputTextField';
import TemplateButton from '../../simpleComponents/templateButton';

function EditProfileForm() {
  return (
    <form className={classes['edit-form']}>
      <h2>Edit Profile</h2>
      <div className={classes['edit-form__fields']}>
        <InputTextField type="text" placeholderText="Username" labelText="Username" />
        <InputTextField type="text" placeholderText="Email address" labelText="Email address" />
        <InputTextField type="password" placeholderText="New password" labelText="New password" />
        <InputTextField type="text" placeholderText="Paste url here" labelText="Avatar image(url)" />
      </div>
      <TemplateButton type="submit" name="edit-profile-button" label="Save" />
    </form>
  );
}

export default EditProfileForm;
