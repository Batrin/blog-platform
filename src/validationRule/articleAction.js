const articleRule = {
  title: {
    required: 'Required field',
    maxLength: {
      value: 80,
      message: 'Max length 80 characters',
    },
  },
  description: {
    required: 'Required field',
    maxLength: {
      value: 160,
      message: 'Max length 160 characters',
    },
  },
  text: {
    required: 'Required field',
  },
};

export default articleRule;
