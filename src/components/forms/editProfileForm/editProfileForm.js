import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';
import classes from './editProfileForm.module.scss';
import InputTextField from '../../simpleComponents/inputTextField';
import TemplateButton from '../../simpleComponents/templateButton';
import editProfileRule from '../../../validationRule/editProfileRule';
import BlogApi from '../../../api';

const api = new BlogApi();

function EditProfileForm({ user, updateUser }) {
  const { username, email, password, url } = editProfileRule;
  const [success, setSuccess] = useState(false);
  const alert = success ? <Alert severity="success">Success</Alert> : null;
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      username: user && user.username,
      email: user && user.email,
      image: user && user.image,
    },
  });

  const onSubmit = (data) => {
    const userInfo = {
      user: {
        ...data,
      },
    };
    api
      .updateUserProfile(userInfo, user.token)
      .then((res) => {
        updateUser(res);
        setSuccess(true);
      })
      .catch((err) => {
        const errObj = err.errors;
        for (const errObjKey in errObj) {
          setError(errObjKey, {
            type: `${errObjKey} error`,
            message: errObj[errObjKey],
          });
        }
      });
  };

  return (
    <form className={classes['edit-form']} onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Profile</h2>
      <div className={classes['edit-form__fields']}>
        <InputTextField
          register={{
            ...register('username', { ...username }),
          }}
          type="text"
          placeholderText="Username"
          labelText="Username"
          errors={errors.username}
        />
        <InputTextField
          register={{
            ...register('email', { ...email }),
          }}
          type="text"
          placeholderText="Email address"
          labelText="Email address"
          errors={errors.email}
        />
        <InputTextField
          register={{
            ...register('password', { ...password }),
          }}
          type="password"
          placeholderText="New password"
          labelText="New password"
          errors={errors.password}
        />
        <InputTextField
          register={{
            ...register('image', { ...url }),
          }}
          type="text"
          placeholderText="Paste url here"
          labelText="Avatar image(url)"
          errors={errors.image}
        />
      </div>
      <TemplateButton type="submit" name="edit-profile-button" label="Save" />
      {alert}
    </form>
  );
}

EditProfileForm.propTypes = {
  user: PropTypes.instanceOf(Object),
  updateUser: PropTypes.func,
};

export default EditProfileForm;
