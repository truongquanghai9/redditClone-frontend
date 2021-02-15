import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useHistory, withRouter } from 'react-router-dom';
import { changePost } from '../HandleEvent/changePost.js';
import { handleError } from '../HandleEvent/handleError.js';
import { handleClick } from '../HandleEvent/handleClick.js';
import { handleReadPost } from '../HandleEvent/handleReadPost.js';

import './Posts.css';
import '../Route/Header.css';
const Posts = props => {
  const [posts, setPosts] = useState(props.posts);

  useEffect(() => {
    setPosts(props.posts);
  }, [props]);

  return (
    <div>
      {posts.map(singlePost => {
        return (
          <EachPost
            key={singlePost.postId}
            singlePost={singlePost}
            posts={posts}
          />
        );
      })}
    </div>
  );
};

const EachPost = React.memo(props => {
  const [eachPost, setEachPost] = useState({});
  const [showColorUpVote, isShowColorUpVote] = useState(false);
  const [showColorDownVote, isShowColorDownVote] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    setEachPost(props.singlePost);
    if (props.singlePost.upVote === false) {
      isShowColorUpVote(false);
    } else {
      isShowColorUpVote(true);
    }
    if (props.singlePost.downVote === false) {
      isShowColorDownVote(false);
    } else {
      isShowColorDownVote(true);
    }
  }, []);

  return (
    <div className='post-container'>
      {error && <h2 className='error'>{errorMessage}</h2>}
      <div className='left-post'>
        <div className='vote'>
          <FontAwesomeIcon
            icon='arrow-up'
            className='arrowUp'
            color={showColorUpVote === true ? 'green' : 'black'}
            onClick={() =>
              handleClick(
                'UPVOTE',
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
              )
            }
          />
          <span>{eachPost.voteCount}</span>
          <FontAwesomeIcon
            icon='arrow-down'
            className='arrowDown'
            color={showColorDownVote === true ? 'red' : 'black'}
            onClick={() =>
              handleClick(
                'DOWNVOTE',
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
              )
            }
          />
        </div>
      </div>
      <div className='right-post'>
        <div className='top'>
          <h5>/subReddit/{eachPost.subRedditName}</h5>
          <p className='duration'>
            Posted by {eachPost.username} {eachPost.duration}
          </p>
        </div>
        <div className='post-body'>
          <h2>{eachPost.postName}</h2>
          <p style={{ color: '#39434a', fontSize: 14 }}>
            {eachPost.description}
          </p>
        </div>
        <div className='bottom'>
          <p>Comments({eachPost.commentCount})</p>
          <button
            onClick={() =>
              handleReadPost(
                location,
                history,
                handleError,
                setError,
                setErrorMessage,
                eachPost,
                props.posts
              )
            }
            className='readPost'
          >
            Read Post
          </button>
        </div>
      </div>
    </div>
  );
});

export default withRouter(Posts);
