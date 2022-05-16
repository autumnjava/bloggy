import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function PostCreate() {
    const [title, setTitle] = useState('');

    const onSubmitFn = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
        });
        setTitle('');
    }
  return (
    <div>
        <form onSubmit={onSubmitFn} >
            <div className="form-group"  style={{padding: '20px 0'}}>
                <label>Title</label>
                <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default PostCreate