const signInRule = {
  emailRule: {
    required: 'Required field',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      message: 'Uncorrectly email',
    },
  },
  password: {
    required: 'Required field',
  },
};

export default signInRule;
