import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export const Update = () => {
  const [podcast, setPodcast] = useState({
    title: "",
    desc: "",
    cover: ""
  })

  const navigate = useNavigate()
  const location = useLocation()

  const podcastId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setPodcast((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:8800/podcasts/"+podcastId, podcast)
      navigate("/")
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>Update Podcast</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title'/>
      <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
      <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
      <button onClick={handleClick}>Update</button>
    </div>
  )
}
