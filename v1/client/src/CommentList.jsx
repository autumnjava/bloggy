import React, { useState, useEffect } from 'react';
import axios from 'axios'

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    setComments(res.data);
  }

  return (
    <ul>
      {comments.map(comment => 
        <li key={comment.id}>{comment.content}</li> 
      )}
    </ul>
  )
}

export default CommentList