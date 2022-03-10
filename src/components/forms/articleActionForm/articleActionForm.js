import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import InputTextField from '../../simpleComponents/inputTextField';
import classes from './articleActionForm.module.scss';
import TemplateButton from '../../simpleComponents/templateButton';
import articleRule from '../../../validationRule/articleAction';
import BlogApi from '../../../api';

const api = new BlogApi();

function ArticleActionForm({ articleInfo, user, isEditing }) {
  const { title, description, text } = articleRule;
  const formTitle = isEditing ? 'Edit article' : 'Create new article';
  const buttonText = isEditing ? 'Save' : 'Send';
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (articleInfo && isEditing) {
      const { tagList } = articleInfo;
      const tagArrObj = tagList && tagList.map((tag) => ({ inputValue: tag }));
      const finalStateObj = {
        title: articleInfo.title,
        description: articleInfo.description,
        tags: tagArrObj,
        text: articleInfo.body,
      };
      for (const key in finalStateObj) {
        setValue(key, finalStateObj[key]);
      }
    } else {
      reset();
    }
  }, [articleInfo, isEditing, reset, setValue]);

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: 'tags',
  });

  const onSuccess = () => navigate('/');

  const onSubmit = (data) => {
    const { tags } = data;
    const tagArr = tags.map((obj) => obj.inputValue);
    const newArticleObj = {
      article: {
        title: data.title,
        tagList: tagArr,
        description: data.description,
        body: data.text,
      },
    };
    if (!isEditing) {
      api.addNewArticle(newArticleObj, user.token).then(() => onSuccess());
    } else {
      api.updateArticle(slug, newArticleObj, user.token).then(() => onSuccess());
    }
  };
  const tagsFields = fields.map((item, index) => (
    <div key={index} className={classes['article-action__tags-item']}>
      <InputTextField
        placeholderText="Tag"
        type="text"
        key={item.id}
        register={{
          ...register(`tags.${index}.inputValue`),
        }}
      />
      <TemplateButton key={index} onButtonClick={() => remove(index)} label="Delete" />
    </div>
  ));

  const addNewTag = () => {
    const newTagText = getValues('new-tag-input');
    prepend({ inputValue: newTagText });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['article-action__form']}>
        <h2>{formTitle}</h2>
        <div className={classes['article-action__fields']}>
          <InputTextField
            register={{
              ...register('title', { ...title }),
            }}
            type="text"
            placeholderText="Title"
            labelText="Title"
            errors={errors.title}
          />
          <InputTextField
            register={{
              ...register('description', { ...description }),
            }}
            type="text"
            placeholderText="Short description"
            labelText="Description"
            errors={errors.description}
          />
          <label>
            Article text
            <textarea
              className={errors.text && classes['error-textarea']}
              placeholder="Text..."
              {...register('text', { ...text })}
            />
            {errors.text && <span>{errors.text.message}</span>}
          </label>
          <div className={classes['article-action__tag-fields']}>
            <p>Tags</p>
            {tagsFields}
            <div className={classes['article-action__new-tag']}>
              <InputTextField
                type="text"
                placeholderText="Tag"
                register={{
                  ...register('new-tag-input'),
                }}
              />
              <TemplateButton type="button" label="Add tag" name="add-new-tag" onButtonClick={addNewTag} />
            </div>
          </div>
        </div>
        <TemplateButton type="submit" name="article-action-submit" label={buttonText} />
      </form>
    </div>
  );
}

ArticleActionForm.propTypes = {
  user: PropTypes.instanceOf(Object),
  isEditing: PropTypes.bool,
  articleInfo: PropTypes.instanceOf(Object),
};

export default ArticleActionForm;
