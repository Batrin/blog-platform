import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import ArticleList from '../atricleList';
import classes from './articleListWrapper.module.scss';
import BlogApi from '../../../api';

const api = new BlogApi();

function ArticleListWrapper({ user }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [articlesCount, setArticlesCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  let pageCount = Math.floor(articlesCount / 5);

  if (articlesCount === 0) {
    pageCount = 1;
  }

  useEffect(() => {
    setLoading(true);
    api.getArticles().then((res) => {
      setArticles(res.articles);
      setArticlesCount(res.articlesCount);
      setLoading(false);
    });
  }, []);

  const onPaginationChange = (...args) => {
    const newPage = args[1];
    const offsetCount = (newPage - 1) * 5;
    setLoading(true);

    api.getArticles(offsetCount).then((res) => {
      setArticles(res.articles);
      setCurrentPage(newPage);
      setLoading(false);
    });
  };

  const articleListCom = (
    <ArticleList
      user={user}
      articleList={articles}
      onPaginationChange={onPaginationChange}
      pageCount={pageCount}
      page={currentPage}
    />
  );

  const displayedItem = !isLoading ? articleListCom : <CircularProgress />;
  return <div className={classes['article-list__wrapper']}>{displayedItem}</div>;
}

ArticleListWrapper.propTypes = {
  user: PropTypes.instanceOf(Object),
};

export default ArticleListWrapper;
