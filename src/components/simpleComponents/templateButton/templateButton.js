import React from 'react';
import PropTypes from 'prop-types';
import classes from './templateButton.module.scss';

function TemplateButton({ type, label, onButtonClick, name }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} name={name} className={classes['template-button']} aria-label={label} onClick={onButtonClick}>
      {label}
    </button>
  );
}

TemplateButton.propTypes = {
  label: PropTypes.string,
  onButtonClick: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default TemplateButton;
