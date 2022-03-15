import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import classes from './singleArticle.module.scss';
import ArticleListItem from '../articleListItem';

function SingleArticle({ user, singleArticle }) {
  const { body } = singleArticle;
  const articleBody = body ? (
    <div className={classes.article__body}>
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown rehypePlugins={[rehypeRaw]} children={body} />
    </div>
  ) : null;
  return (
    <article className={classes.article}>
      <ArticleListItem showUserPanel user={user} article={singleArticle} />
      {articleBody}
    </article>
  );
}

SingleArticle.propTypes = {
  singleArticle: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
};

export default SingleArticle;
