import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './articleListItem.module.scss';
import DataTransform from '../../../utils';
import Avatar from '../avatar';
import ArticleTag from '../articleTag';
import ArticleLikeButton from '../articleLikeButton';
import BlogApi from '../../../api';
import PanelControl from '../panelControl';

const api = new BlogApi();

const dataTransform = new DataTransform();

function ArticleListItem({ user, article, showUserPanel }) {
  const navigate = useNavigate();
  const [singleArticle, setSingleArticle] = useState(article);
  const { title, favoritesCount, tagList, description, author, createdAt, slug } = singleArticle;
  const { image, username } = author;
  const isLikeDisabled = !user ? true : false;
  const initialState = !isLikeDisabled ? localStorage.getItem(slug) === user.username : false;
  const [isLikedByCurrentUser, setLiked] = useState(initialState);
  const isPanelActive = showUserPanel && user && user.username === username ? true : false;

  const deleteArticle = () => {
    api
      .deleteArticle(slug, user.token)
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  const userPanel = isPanelActive ? <PanelControl slug={slug} onConfirm={deleteArticle} /> : null;

  const shortDesc = dataTransform.trimText(description, 15);
  const shortTitle = dataTransform.trimText(title, 8);
  const newDate = dataTransform.transformDate(createdAt);

  const tagsItemList = tagList.map((tag, index) => {
    if (tag) {
      return <ArticleTag tagName={tag} key={index} />;
    }
    return null;
  });

  const favoriteArticle = () => {
    if (!isLikedByCurrentUser) {
      api.favoriteArticle(slug, user.token).then((res) => {
        setSingleArticle(res.article);
      });
      localStorage.setItem(slug, user.username);
      setLiked(true);
    } else {
      api.unfavoriteArticle(slug, user.token).then((res) => {
        setSingleArticle(res.article);
        localStorage.removeItem(slug);
        setLiked(false);
      });
    }
  };

  return (
    <div className={classes.article}>
      <div className={classes['article__left-info-block']}>
        <header className={classes.article__header}>
          <Link to={`/articles/${slug}`}>
            <h5>{shortTitle}</h5>
          </Link>
          <div className={classes.article__rate}>
            <ArticleLikeButton onClick={favoriteArticle} isDisabled={isLikeDisabled} liked={isLikedByCurrentUser} />
            <p>{favoritesCount}</p>
          </div>
        </header>
        <section>
          <div className={classes['article__tag-list']}>{tagsItemList}</div>
          <div className={classes['article-desc-panel']}>
            <p className={classes.article__desc}>{shortDesc}</p>
          </div>
        </section>
      </div>
      <div className={classes['article__right-info-block']}>
        <div className={classes.article__info}>
          <div className={classes['article__user-info']}>
            <p className={classes.article__username}>{username}</p>
            <p className={classes.article__date}>{newDate}</p>
          </div>
          <Avatar avatarUrl={image} />
        </div>
        {userPanel}
      </div>
    </div>
  );
}

ArticleListItem.propTypes = {
  user: PropTypes.instanceOf(Object),
  showUserPanel: PropTypes.bool,
  article: PropTypes.instanceOf(Object),
};

export default ArticleListItem;
