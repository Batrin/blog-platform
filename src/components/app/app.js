import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import classes from './app.module.scss';
import AppHeader from '../appHeader';
import BlogApi from '../../api';
import ArticleListWrapper from '../articleListWrapper';

const api = new BlogApi();

function App() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const pageCount = Math.floor(articlesCount / 5);

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

  const articlesListComponent = (
    <ArticleListWrapper
      onPaginationChange={onPaginationChange}
      articleList={articles}
      page={currentPage}
      pageCount={pageCount}
      isLoading={isLoading}
    />
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <AppHeader />
        <Routes>
          <Route path="/" element={articlesListComponent} />
          <Route path="/articles" element={articlesListComponent} />
          <Route path="/articles/:articleId" element={<div>test</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
