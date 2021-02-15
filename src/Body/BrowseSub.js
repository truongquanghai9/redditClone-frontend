const BrowseSub = props => {
  const { posts } = props;
  const setOfSubreddit = new Set();
  Array.from(setOfSubreddit).sort();
  posts.map(eachPost => setOfSubreddit.add(eachPost.subredditName));
  console.log(posts);
  console.log(setOfSubreddit);
  return (
    <div className='browsesub-elements'>
      <div className='browsesub-header'>
        <h5>Browse Subreddit</h5>
      </div>
      {setOfSubreddit.size <= 3 ? (
        <div>
          {
            new Set(
              Array.from(setOfSubreddit.values(), (eachSub, index) => (
                <li className='eachSub' key={index}>
                  {eachSub}
                </li>
              ))
            )
          }
        </div>
      ) : (
        <div>
          {
            <div>
              <li className='eachSub'>{setOfSubreddit.get(0)}</li>
              <li className='eachSub'>{setOfSubreddit.get(1)}</li>
              <li className='eachSub'>{setOfSubreddit.get(2)}</li>
            </div>
          }
          <nav>
            <h5>View All</h5>
          </nav>
        </div>
      )}
    </div>
  );
};
export default BrowseSub;
