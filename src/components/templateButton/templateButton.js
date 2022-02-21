import React from 'react';
import PropTypes from 'prop-types';
import classes from './templateButton.module.scss';

function TemplateButton({ label, onButtonClick, name }) {
  return (
    <button name={name} className={classes['template-button']} type="button" aria-label={label} onClick={onButtonClick}>
      {label}
    </button>
  );
}

TemplateButton.propTypes = {
  label: PropTypes.string,
  onButtonClick: PropTypes.func,
  name: PropTypes.string,
};

export default TemplateButton;
