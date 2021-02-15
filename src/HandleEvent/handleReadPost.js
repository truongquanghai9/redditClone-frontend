import React from 'react';

export const handleReadPost = (
  location,
  history,
  handleError,
  setError,
  setErrorMessage,
  eachPost,
  posts
) => {
  if (
    location !== undefined &&
    location.state !== undefined &&
    location.state.login === true
  ) {
    history.push({
      pathname: `/post/${eachPost.postId}`,
      state: {
        authenticationToken: location.state.authenticationToken,
        expiresAt: location.state.expiresAt,
        login: true,
        logout: false,
        refreshToken: location.state.refreshToken,
        username: location.state.username,
        posts: posts
      }
    });
  } else {
    handleError(500, setError, setErrorMessage);
  }
};
