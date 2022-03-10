import React from 'react';
import PropTypes from 'prop-types';
import classes from './avatar.module.scss';
import defaultPoster from './default_avatar.png';

function Avatar({ avatarUrl }) {
  const userAvatar = avatarUrl ? avatarUrl : defaultPoster;
  return <img src={userAvatar} alt="User Avatar" className={classes.avatar} />;
}

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
};

export default Avatar;
