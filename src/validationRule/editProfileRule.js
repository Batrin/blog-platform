const editProfileRule = {
  username: {
    required: 'Required field',
  },
  email: {
    required: 'Required field',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      message: 'Uncorrectly email',
    },
  },
  password: {
    required: 'Required field',
    minLength: {
      value: 6,
      message: 'Min length 3 characters',
    },
    maxLength: {
      value: 40,
      message: 'Max length 40 characters',
    },
  },
  url: {
    pattern: {
      value: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/,
      message: 'Uncorrect url',
    },
  },
};

export default editProfileRule;
