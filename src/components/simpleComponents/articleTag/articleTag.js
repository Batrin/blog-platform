import React from 'react';
import PropTypes from 'prop-types';
import classes from './articleTag.module.scss';

function ArticleTag({ tagName }) {
  return <div className={classes.article__tag}>{tagName}</div>;
}

ArticleTag.propTypes = {
  tagName: PropTypes.string,
};

export default ArticleTag;
