import React from 'react';
import classes from './app.module.scss';
import AppHeader from '../appHeader';

function App() {
  return (
    <div className={classes.wrapper}>
      <AppHeader />
    </div>
  );
}

export default App;
