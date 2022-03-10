import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './appHeader.module.scss';
import TemplateButton from '../templateButton';
import Avatar from '../avatar';

function AppHeader({ user, logOut }) {
  const noUserButtons = (
    <>
      <Link to="/sign-in">
        <TemplateButton type="button" label="Sign in" name="signIn" />
      </Link>
      <Link to="/sign-up">
        <TemplateButton type="button" label="Sign up" name="signUp" />
      </Link>
    </>
  );

  const userPanel = (
    <div className={classes['header__user-panel']}>
      <Link to="/new-article">
        <TemplateButton type="button" label="Create article" name="createArticle" />
      </Link>
      <div className={classes['header__user-info']}>
        <Link to="/profile">
          <div className={classes['header__user-button']}>
            <p>{user ? user.username : null}</p>
            <Avatar avatarUrl={user ? user.image : null} />
          </div>
        </Link>
      </div>
      <Link to="/articles">
        <TemplateButton onButtonClick={logOut} type="button" label="Log out" name="logout" />
      </Link>
    </div>
  );

  const headerPanel = user ? userPanel : noUserButtons;

  return (
    <header className={classes.header}>
      <Link to="/articles">
        <h6>Realworld Blog</h6>
      </Link>
      <div className={classes.header__panel}>{headerPanel}</div>
    </header>
  );
}

AppHeader.propTypes = {
  user: PropTypes.instanceOf(Object),
  logOut: PropTypes.func,
};

export default AppHeader;
