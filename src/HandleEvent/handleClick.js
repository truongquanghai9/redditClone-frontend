import React from 'react';

export const handleClick = (
  arrow,
  setEachPost,
  location,
  eachPost,
  changePost,
  showColorDownVote,
  showColorUpVote,
  isShowColorDownVote,
  isShowColorUpVote,
  handleError,
  setError,
  setErrorMessage
) => {
  if (location !== undefined && location.state !== undefined) {
    return fetch('/api/votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + location.state.authenticationToken
      },
      body: JSON.stringify({
        postId: eachPost.postId,
        voteType: arrow
      })
    })
      .then(response => {
        if (response.ok) {
          console.log('Childcomponent: upVote: ' + eachPost.upVote);
          console.log('Childcomponent: downVote: ' + eachPost.downVote);
          console.log('Childcomponent: count: ' + eachPost.voteCount);
          let tempVoteCount = eachPost.voteCount;
          let tempPost = { ...eachPost };
          if (eachPost.upVote === false && eachPost.downVote === false) {
            if (arrow === 'UPVOTE') {
              tempPost.upVote = true;
              tempPost.downVote = false;
              tempPost.voteCount = ++tempVoteCount;
            } else {
              tempPost.upVote = false;
              tempPost.downVote = true;
              tempPost.voteCount = --tempVoteCount;
            }
          } else {
            if (arrow === 'UPVOTE' && eachPost.upVote === true) {
              tempPost.upVote = false;
              tempPost.downVote = false;
              tempPost.voteCount = --tempVoteCount;
            } else if (arrow === 'DOWNVOTE' && eachPost.downVote === true) {
              tempPost.upVote = false;
              tempPost.downVote = false;
              tempPost.voteCount = ++tempVoteCount;
            } else {
              if (arrow === 'UPVOTE') {
                ++tempVoteCount;

                tempPost.upVote = true;
                tempPost.downVote = false;
                tempPost.voteCount = ++tempVoteCount;
              } else {
                --tempVoteCount;

                tempPost.upVote = false;
                tempPost.downVote = true;
                tempPost.voteCount = --tempVoteCount;
              }
            }
          }
          //changePost(tempVote, arrow);

          changePost(
            tempPost,
            arrow,
            setEachPost,
            showColorDownVote,
            showColorUpVote,
            isShowColorDownVote,
            isShowColorUpVote
          );
        } else {
          console.log(response.status);
          handleError(response.status, setError, setErrorMessage);
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    handleError(500, setError, setErrorMessage);
  }
};
