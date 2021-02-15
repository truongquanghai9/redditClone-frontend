import React from 'react';

export const changePost = (
  tempPost,
  arrow,
  setEachPost,
  showColorDownVote,
  showColorUpVote,
  isShowColorDownVote,
  isShowColorUpVote
) => {
  setEachPost({ ...tempPost });
  if (arrow === 'DOWNVOTE') {
    isShowColorDownVote(!showColorDownVote);
    isShowColorUpVote(false);
  } else {
    isShowColorUpVote(!showColorUpVote);
    isShowColorDownVote(false);
  }
};
