import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';


const PostScreen = () => {
  // Get the post ID from the route parameters
  const { id } = useParams();

  // State to hold the post data
  const [post, setPost] = useState(null);

  // Fetch post data based on the ID when the component mounts
  useEffect(() => {
    // API call to fetch post data
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    // Call the fetchPost function
    fetchPost();
  }, [id]);

  // Render the component
  return (
    <div className='parent-container'>
    <div className="container">
    
      <h2 className="postscreen-title">Post Detail</h2>
      {post ? (
        <div>
          <h3 className="post-title">{post.title}</h3>
          <p className="points">Points: {post.points}</p>

          <h4 className="comments-heading">Comments:</h4>
          <ul className="comments-list">
            {post.children &&
              post.children.map((comment) => (
                <li key={comment.id} className="comment">
                  {/* Display the comment text */}
                  <blockquote
                    className="comment-box"
                    dangerouslySetInnerHTML={{ __html: comment.text }}
                  />
                </li>
              ))}
          </ul>
        </div>
      ) : (
        // Show a loading message while fetching data
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

// Export the PostScreen component
export default PostScreen;
