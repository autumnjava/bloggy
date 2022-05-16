import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function CommentCreate({ postId }) {
    const [content, setContent] = useState('');

    const onSubmitFn = async (e) => {
        e.preventDefault();
        await axios.post(`/posts/${postId}/comments`, {
            content
        });
        setContent('');
    }

  return (
    <div style={{margin: '5px 10px'}}>
        <form onSubmit={onSubmitFn} >
            <div className="form-group"  style={{padding: '20px 0'}}>
                <label>Title</label>
                <input className="form-control" value={content} onChange={e => setContent(e.target.value)} />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default CommentCreate