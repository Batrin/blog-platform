import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './inputTextField.module.scss';

function InputTextField({ errors, register, labelText, placeholderText, type }) {
  const isError = errors ? true : false;
  const errorText = isError ? <p className={classes.error__text}>{errors.message}</p> : null;
  const inputClasses = classNames({
    [classes['label-wrapper__input']]: true,
    [classes['label-wrapper__input-error']]: isError,
  });
  return (
    <div className={classes['label-wrapper']}>
      <label>
        {labelText}
        <input {...register} className={inputClasses} type={type} placeholder={placeholderText} />
      </label>
      {errorText}
    </div>
  );
}

InputTextField.propTypes = {
  labelText: PropTypes.string,
  placeholderText: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.instanceOf(Object),
  errors: PropTypes.instanceOf(Object),
};

export default InputTextField;
