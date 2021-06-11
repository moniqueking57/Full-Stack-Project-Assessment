const express = require('express');
const {Pool} = require('pg');
const app = express();

const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'moniqueking',
  password: '',
  database: 'video_data',
};

const pool = new Pool(dbConfig);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get('/', (req, res) => {
  res.send({express: 'Your Backend Service is Running'});
});

app.get('/videos', function (req, res) {
  pool.query('SELECT * FROM videos', (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  });
});

app.post('/videos', (req, res) => {
  const newVideo = req.body.video;
  pool
    .query('SELECT * FROM videos WHERE title=$1', [newVideo])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send('A video with the same name already exists!');
      } else {
        const query = 'INSERT INTO videos (title) VALUES ($1)';
        pool
          .query(query, [newVideo])
          .then(() => res.send('Video created!'))
          .catch((e) => console.error({message: 'Video could not be saved'}));
      }
    });
});

app.get('/videos/:id', function (req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({message: 'Error'});
  } else {
    pool
      .query('SELECT * FROM videos WHERE id=$1', [id])
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  }
});

app.delete('/videos/:videosId', (req, res) => {
  const id = parseInt(req.params.customerId);
  if (isNaN(id)) {
    res.status(400).send({message: 'Video could not be deleted'});
  } else {
    pool
      .query('DELETE FROM videos WHERE id=$1', [id])
      .then(() => res.send(`204: video ${id} deleted`))
      .catch((error) =>
        res.status(500).send({message: 'Video could not be deleted'})
      );
  }
});
