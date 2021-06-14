const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbConfig = {
  connectionString: `postgres://efgtfwymxyzbmq:be7b25e752ca6635418f5ab22f241ab984e2a3bc231cb726868f63bb44d9edf8@ec2-54-220-170-192.eu-west-1.compute.amazonaws.com:5432/d8r40s720q233s
`,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(dbConfig);

const port = process.env.PORT || 5000;

pool
  .query(
    `
SELECT * FROM videos;
`
  )
  .then((response) => console.log(response.rows));

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get('/', (req, res) => {
  res.send({express: 'Your Backend Service is Running'});
});

app.get('/videos', function (req, res) {
  pool
    .query('SELECT * FROM videos')
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.post('/videos', (req, res) => {
  const newId = req.body.id;
  const newTitle = req.body.title;
  const newRating = req.body.rating;
  pool
    .query('SELECT * FROM videos WHERE videos.title=$1', [newId])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send('A video with the same name already exists!');
      } else {
        const query =
          'INSERT INTO videos (id, title, rating) VALUES ($1, $2, $3)';
        pool
          .query(query, [newId, newTitle, newRating])
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
  const id = parseInt(req.params.videosId);
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
