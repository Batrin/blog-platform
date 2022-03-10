import React from 'react';
import { Popconfirm } from 'antd';
import 'antd/dist/antd.min.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './panelControl.module.scss';

function PanelControl({ slug, onConfirm }) {
  return (
    <div className={classes['panel-control']}>
      <Popconfirm onConfirm={onConfirm} title="Are you sure you want delete article?">
        <button name="delete-article" aria-label="delete" type="button">
          Delete
        </button>
      </Popconfirm>
      <Link to={`/articles/${slug}/edit`}>
        <button name="edit-article" aria-label="delete" type="button">
          Edit
        </button>
      </Link>
    </div>
  );
}

PanelControl.propTypes = {
  slug: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default PanelControl;
