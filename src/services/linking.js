const config = {
  screens: {
    Login: {
      path: 'login/:user',
      parse: {
        name: params => `${params}`,
      },
    },
  },
};

const linking = {
  prefixes: ['too://app'],
  config,
};

export default linking;
