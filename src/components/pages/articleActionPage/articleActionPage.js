import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './articleActionPage.module.scss';
import ArticleActionForm from '../../forms/articleActionForm';
import BlogApi from '../../../api';

const api = new BlogApi();

function ArticleActionPage({ user, isEditing }) {
  const { slug } = useParams();
  const [articleInfo, setArticleInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (isEditing) {
      api.getSingleArticle(slug).then((res) => {
        setArticleInfo(res.article);
      });
    }
  }, [isEditing, slug]);

  return (
    <div className={classes['article-action__wrapper']}>
      <ArticleActionForm articleInfo={articleInfo} isEditing={isEditing} user={user} />
    </div>
  );
}

ArticleActionPage.propTypes = {
  user: PropTypes.instanceOf(Object),
  isEditing: PropTypes.bool,
};

export default ArticleActionPage;
