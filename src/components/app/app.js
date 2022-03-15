import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import classes from './app.module.scss';
import AppHeader from '../simpleComponents/appHeader';
import ArticleListWrapper from '../simpleComponents/articleListWrapper';
import SingleArticlePage from '../pages/singleArticlePage';
import SignInPage from '../pages/signInPage';
import SignUpPage from '../pages/signUpPage';
import ProfilePage from '../pages/profilePage';
import ArticleActionPage from '../pages/articleActionPage';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const updateUser = (res) => {
    if (res) {
      setUser({ ...res.user });
      localStorage.setItem('user', JSON.stringify(res.user));
    }
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
          <Route path="/" element={<ArticleListWrapper user={user} />} />
          <Route path="/articles" element={<ArticleListWrapper user={user} />} />
          <Route path="/articles/:articleId" element={<SingleArticlePage user={user} />} />
          <Route path="/sign-in" element={<SignInPage user={user} setUser={updateUser} />} />
          <Route path="/sign-up" element={<SignUpPage user={user} setUser={updateUser} />} />
          <Route path="/profile" element={<ProfilePage user={user} updateUser={updateUser} />} />
          <Route path="/new-article" element={<ArticleActionPage user={user} />} />
          <Route path="/articles/:slug/edit" element={<ArticleActionPage user={user} isEditing />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
