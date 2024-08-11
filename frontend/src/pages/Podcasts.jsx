import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

export const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    const fetchAllPodcasts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/podcasts")
        setPodcasts(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllPodcasts()
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/podcasts/"+id)
      window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    <div className='container'>
      <h1 className='header'>Podcast Archives</h1>
      <button class="add-btn"><Link to="/add">Add new podcast</Link></button>
      <div className="podcasts">
          {podcasts.map(podcast => (
            <div className='podcast' key={podcast.id}>
              <div className="tooltip-top direction-top">
              <div className="podcast-cover-wrapper">
                <img src={podcast.cover} className='podcast-cover' alt=""/>
              </div>
              <div className="tooltip">
                <h2>{podcast.title}</h2>
                {/* <p>{podcast.desc}</p> */}
              </div>
              <div className="button-group">
                <div><Link to={`/update/${podcast.id}`}><FaRegEdit className='update-btn'/></Link></div>
                <div onClick={() =>handleDelete(podcast.id)}><FaRegTrashAlt className='delete-btn'/></div>
              </div>
            </div>
            </div>
          ))}
      </div>
    </div>
  )
}
