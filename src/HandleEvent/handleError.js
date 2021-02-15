import React from 'react';

export const handleError = (errorStatus, setError, setErrorMessage) => {
  if (errorStatus !== 200) {
    setError(true);
    setErrorMessage('Login is required');
  }
};
