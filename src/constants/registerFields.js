const credentialFields = [
  {
    name: 'email',
    placeholder: 'common.email_placeholder',
    id: 1,
  },
  {
    name: 'password',
    placeholder: 'common.password_placeholder',
    isPassword: true,
    id: 2,
  },
  {
    name: 'confirmPassword',
    placeholder: 'common.confirm_password_placeholder',
    isPassword: true,
    id: 3,
  },
];

const personalData = [
  {
    name: 'firstName',
    placeholder: 'signup.firstname_placeholder',
    id: 4,
  },
  {
    name: 'lastName',
    placeholder: 'signup.lastname_placeholder',
    id: 5,
  },
  {
    name: 'userName',
    placeholder: 'signup.username_placeholder',
    id: 6,
  },
];

export {credentialFields, personalData};
