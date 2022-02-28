import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import classes from './singleArticle.module.scss';
import ArticleListItem from '../articleListItem';

function SingleArticle({ singleArticle }) {
  const { body } = singleArticle;
  const articleBody = body ? (
    <div className={classes.article__body}>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  ) : null;
  return (
    <article className={classes.article}>
      <ArticleListItem article={singleArticle} />
      {articleBody}
    </article>
  );
}

SingleArticle.propTypes = {
  singleArticle: PropTypes.instanceOf(Object),
};

export default SingleArticle;
