import React from 'react';

const withTypeForSchedules = (Component, type = 'my') => {
  return props => <Component {...props} type={type} />;
};

export default withTypeForSchedules;
