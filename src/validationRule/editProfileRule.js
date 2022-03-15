const urlReg = /https?:\/\/\S+(?:jpg|jpeg|png)/;
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
      value: urlReg,
      message: 'Uncorrect url',
    },
  },
};

export default editProfileRule;
