import React from 'react';
import PropTypes from 'prop-types';
import like from './like.svg';
import unlike from './unlike.svg';
import classes from './articleLikeButton.module.scss';

function ArticleLikeButton({ isDisabled, liked, onClick }) {
  const buttonImg = liked ? like : unlike;
  return (
    <button
      onClick={onClick}
      className={classes['like-button']}
      type="button"
      aria-label="like button"
      disabled={isDisabled}
    >
      <img src={buttonImg} alt="like img" />
    </button>
  );
}

ArticleLikeButton.propTypes = {
  isDisabled: PropTypes.bool,
  liked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ArticleLikeButton;
