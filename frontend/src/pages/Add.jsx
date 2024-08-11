import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Add = () => {
  const [podcast, setPodcast] = useState({
    title: "",
    desc: "",
    cover: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setPodcast((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/podcasts", podcast)
      navigate("/")
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='container'>
      <div className="form-wrapper">
        <h1 className='title'>Add New Podcast</h1>
        <div className="form">
          <div className="form-input">
            <input type="text" placeholder='title' onChange={handleChange} name='title'/>
            <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
            <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
          </div>
          <div className="form-image">
          </div>
          <button onClick={handleClick}>Add</button>
        </div>
      </div>
    </div>
  )
}
