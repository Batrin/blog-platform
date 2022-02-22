import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';
import ArticleListItem from '../articleListItem';
import classes from './articleList.module.scss';

function ArticleList({ articleList, page, pageCount, onPaginationChange }) {
  const articleListItems = articleList.map((article) => <ArticleListItem article={article} key={article.slug} />);

  return (
    <div className={classes['article-list__wrapper']}>
      <ul>{articleListItems}</ul>
      <Pagination count={pageCount} page={page} onChange={onPaginationChange} shape="rounded" color="primary" />
    </div>
  );
}

ArticleList.propTypes = {
  articleList: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
  pageCount: PropTypes.number,
  onPaginationChange: PropTypes.func,
};

export default ArticleList;
