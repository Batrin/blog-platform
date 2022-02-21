import React from 'react';
import classes from './appHeader.module.scss';
import TemplateButton from '../templateButton';

function AppHeader() {
  return (
    <header className={classes.header}>
      <h6>
        <a href="/">Realworld Blog</a>
      </h6>
      <div>
        <TemplateButton label="Sign in" name="signIn" />
        <TemplateButton label="Sign up" name="signUp" />
      </div>
    </header>
  );
}

export default AppHeader;
