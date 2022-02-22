import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './articleListItem.module.scss';
import DataTransform from '../../utils';
import Avatar from '../avatar';

const dataTransform = new DataTransform();

function ArticleListItem({ article }) {
  const { title, favoritesCount, tagList, description, author, createdAt, slug } = article;
  const { image, username } = author;

  const shortDesc = dataTransform.trimText(description, 15);
  const shortTitle = dataTransform.trimText(title, 8);
  const newDate = dataTransform.transformDate(createdAt);

  const tagsItemList = tagList.map((tag, index) => {
    if (tag) {
      return (
        <div className={classes.article__tag} key={index}>
          {tag}
        </div>
      );
    }
    return null;
  });

  return (
    <div className={classes.article}>
      <div className={classes['article__left-info-block']}>
        <header className={classes.article__header}>
          <Link to={`/articles/${slug}`}>
            <h5>{shortTitle}</h5>
          </Link>
          <div className={classes.article__rate}>
            <p>{favoritesCount}</p>
          </div>
        </header>
        <section>
          <div className={classes['article__tag-list']}>{tagsItemList}</div>
          <p className={classes.article__desc}>{shortDesc}</p>
        </section>
      </div>
      <div className={classes['article__right-info-block']}>
        <div className={classes['article__user-info']}>
          <p className={classes.article__username}>{username}</p>
          <p className={classes.article__date}>{newDate}</p>
        </div>
        <Avatar avatarUrl={image} />
      </div>
    </div>
  );
}

ArticleListItem.propTypes = {
  article: PropTypes.instanceOf(Object),
};

export default ArticleListItem;
