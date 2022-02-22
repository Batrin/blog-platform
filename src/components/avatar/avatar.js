import React from 'react';
import PropTypes from 'prop-types';
import classes from './avatar.module.scss';

function Avatar({ avatarUrl }) {
  return <img src={avatarUrl} alt="User Avatar" className={classes.avatar} />;
}

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
};

export default Avatar;
