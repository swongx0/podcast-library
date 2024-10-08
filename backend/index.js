import express from 'express'
import mysql, { createConnection } from "mysql"
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app = express()

const db = mysql.createConnection({
    host: process.env.REACT_APP_HOST,
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
    database: process.env.REACT_APP_DATABASE
});

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=> {
    res.json("hello this is the backend!")
})

app.get("/podcasts", (req, res) => {
    const q = "SELECT * FROM podcasts;"
    db.query(q,(err,data)=> {
        if(err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})

app.post("/podcasts", (req, res) => {
    const q = "INSERT INTO podcasts (`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];

    db.query(q,[values], (err, data) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Book had been created successfully")
        }
    })
})

app.delete("/podcasts/:id", (req, res) => {
    const podcastId = req.params.id;
    const q = "DELETE FROM podcasts WHERE id =?"

    db.query(q,[podcastId], (err, data) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Book had been deleted successfully")
        }
    })
})

app.put("/podcasts/:id", (req, res) => {
    const podcastId = req.params.id;
    const q = "UDPATE podcasts SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query([...values,podcastId], (err, data) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Book had been updated successfully")
        }
    })
})

app.listen(8800, () => {
    console.log("Connected to backend")
})