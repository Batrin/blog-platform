import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './customCheckbox.module.scss';

function CustomCheckbox({ labelText, register, errors }) {
  const isError = errors ? true : false;
  const errBlock = isError ? <p>{errors.message}</p> : null;
  const checkboxClasses = classNames({
    [classes.check]: true,
    [classes.check__error]: isError,
  });
  return (
    <label className={checkboxClasses}>
      <input {...register} type="checkbox" className={classes.check__input} />
      <span className={classes.check__box} />
      <span>{labelText}</span>
      {errBlock}
    </label>
  );
}

CustomCheckbox.propTypes = {
  labelText: PropTypes.string,
  register: PropTypes.instanceOf(Object),
  errors: PropTypes.instanceOf(Object),
};

export default CustomCheckbox;
