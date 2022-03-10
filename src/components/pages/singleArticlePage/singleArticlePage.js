import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import BlogApi from '../../../api';
import SingleArticle from '../../simpleComponents/singleArticle';
import classes from './singleArticlePage.module.scss';

const api = new BlogApi();

function SingleArticlePage({ user }) {
  const { articleId } = useParams();
  const [singleArticle, setSingleArticle] = useState();
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    api.getSingleArticle(articleId).then((res) => {
      setSingleArticle(res.article);
      setLoading(false);
    });
  }, [articleId]);

  const loading = isLoading ? <CircularProgress /> : null;
  const article = !isLoading && singleArticle ? <SingleArticle user={user} singleArticle={singleArticle} /> : null;
  return (
    <div className={classes.article__wrapper}>
      {loading}
      {article}
    </div>
  );
}

SingleArticlePage.propTypes = {
  user: PropTypes.instanceOf(Object),
};

export default SingleArticlePage;
