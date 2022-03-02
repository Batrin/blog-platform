import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import ArticleList from '../atricleList';
import classes from './articleListWrapper.module.scss';

function ArticleListWrapper({ articleList, page, pageCount, onPaginationChange, isLoading }) {
  const articleListCom = (
    <ArticleList articleList={articleList} page={page} pageCount={pageCount} onPaginationChange={onPaginationChange} />
  );
  const displayedItem = !isLoading ? articleListCom : <CircularProgress />;
  return <div className={classes['article-list__wrapper']}>{displayedItem}</div>;
}

ArticleListWrapper.propTypes = {
  articleList: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
  pageCount: PropTypes.number,
  onPaginationChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ArticleListWrapper;
