const signUpRule = {
  userName: {
    required: 'Required field',
    minLength: {
      value: 3,
      message: 'Min length 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Max length 20 characters',
    },
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
      message: 'Min length 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Max length 40 characters',
    },
  },
  repeatPassword: (pass) => ({
    required: 'Required field',
    validate: (value) => value === pass || 'Passwords must match',
  }),
  checkbox: {
    validate: (isChecked) => isChecked,
  },
};

export default signUpRule;
