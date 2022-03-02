import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import classes from './app.module.scss';
import AppHeader from '../appHeader';
import BlogApi from '../../../api';
import ArticleListWrapper from '../articleListWrapper';
import SingleArticlePage from '../../pages/singleArticlePage';
import SignInPage from '../../pages/signInPage';
import SignUpPage from '../../pages/signUpPage';
import ProfilePage from '../../pages/profilePage';

const api = new BlogApi();

function App() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

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

  const signInSubmit = (data) => {
    const userInfo = {
      user: {
        ...data,
      },
    };
    api.signInUser(userInfo).then((res) => {
      const { username } = res.user;
      setUser({ username });
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <AppHeader user={user} logOut={logOut} />
        <Routes>
          <Route path="/" element={articlesListComponent} />
          <Route path="/articles" element={articlesListComponent} />
          <Route path="/articles/:articleId" element={<SingleArticlePage />} />
          <Route path="/sign-in" element={<SignInPage formSubmit={signInSubmit} />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
