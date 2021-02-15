import React, { useEffect, useState, useRef } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import CreatePostSub from './CreatePostSub.js';
import BrowseSub from './BrowseSub.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changePost } from '../HandleEvent/changePost.js';
import { handleError } from '../HandleEvent/handleError.js';
import { handleClick } from '../HandleEvent/handleClick.js';
import ReactTimeAgo from 'react-time-ago';
import './Posts.css';
import '../Route/Home.css';
import '../Route/Header.css';
import './SinglePost.css';
const SinglePost = props => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState({});
  const [comments, setComments] = useState([]);
  const [showColorUpVote, isShowColorUpVote] = useState(false);
  const [showColorDownVote, isShowColorDownVote] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { history, location } = props;
  console.log(location);

  const refCommentContainer = useRef(null);

  const handleSubmitComment = e => {
    console.log('location:   ' + location);
    if (location !== undefined && location.state !== undefined) {
      fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: singlePost.postId,
          text: refCommentContainer.current.value,
          username: location.state.username
        })
      }).then(response => {
        if (!response.ok) {
          handleError(response.status, setError, setErrorMessage);
        } else {
          console.log(refCommentContainer.current.value);
          setComments([
            ...comments,
            {
              postId: singlePost.postId,
              text: refCommentContainer.current.value,
              username: location.state.username,
              commentDate: Date.now()
            }
          ]);
          refCommentContainer.current.value = '';
        }
      });
    } else {
      handleError(500, setError, setErrorMessage);
    }
  };

  useEffect(() => {
    if (location !== undefined && location.state !== undefined) {
      fetch(`/api/posts/${id}`)
        .then(response => response.json())
        .then(data => {
          setSinglePost(data);
          if (data.upVote === false) {
            isShowColorUpVote(false);
          } else {
            isShowColorUpVote(true);
          }
          if (data.downVote === false) {
            isShowColorDownVote(false);
          } else {
            isShowColorDownVote(true);
          }
          if (data.commentCount > 0) {
            fetch(`/api/comments/by-post/${id}`)
              .then(response => response.json())
              .then(data => {
                setComments(data);
              });
          }
        });
    } else {
      history.push('/');
    }
    const timer = setTimeout(() => {
      setError(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className='container'>
      {error && <h2 className='error'>{errorMessage}</h2>}

      <div className='post-container'>
        <div className='left-post'>
          <div className='vote'>
            <FontAwesomeIcon
              icon='arrow-up'
              className='arrowUp'
              color={showColorUpVote === true ? 'green' : 'black'}
              onClick={() =>
                handleClick(
                  'UPVOTE',
                  setSinglePost,
                  location,
                  singlePost,
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
            <span>{singlePost.voteCount}</span>
            <FontAwesomeIcon
              icon='arrow-down'
              className='arrowDown'
              color={showColorDownVote === true ? 'red' : 'black'}
              onClick={() =>
                handleClick(
                  'DOWNVOTE',
                  setSinglePost,
                  location,
                  singlePost,
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
            <h5>/subReddit/{singlePost.subRedditName}</h5>
            <p className='duration'>
              Posted by {singlePost.username} - {singlePost.duration}
            </p>
          </div>
          <div className='post-body-singlePost'>
            <h2 style={{ color: '#1c79eb' }}>{singlePost.postName}</h2>
            <p style={{ color: '#39434a', fontSize: 14 }}>
              {singlePost.description}
            </p>
          </div>
          <div className='bottom-singlePost'>
            <p id='comment-as'>
              Comment as
              <span style={{ color: '#0a74bf', fontSize: 15 }}>
                {' ' + location.state.username}
              </span>
            </p>
            <div className='singlePost-commentField'>
              <textarea
                placeholder='Leave your comment'
                ref={refCommentContainer}
              ></textarea>
              <button onClick={handleSubmitComment}>COMMENT</button>
            </div>
            <div>
              {singlePost.commentCount === 0 ? (
                <p>NO COMMENT</p>
              ) : (
                comments.map((eachComment, index) => {
                  return <EachComment key={index} eachComment={eachComment} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='side-container'>
        <div className='create-post-subreddit'>
          <CreatePostSub posts={location.state.posts} />
        </div>
        <div className='browse-subreddit'>
          <BrowseSub posts={location.state.posts} />
        </div>
      </div>
    </div>
  );
};

const EachComment = props => {
  const { username, commentDate, text } = props.eachComment;
  return (
    <div className='comment-container'>
      <p className='username'>{username}</p>
      <p>
        <ReactTimeAgo date={commentDate} locale='en-US' />
      </p>
      <p style={{ color: 'black', fontSize: '14', marginTop: '7' }}>{text}</p>
    </div>
  );
};

export default withRouter(SinglePost);
