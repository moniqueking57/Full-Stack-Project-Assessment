import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
//import example from './exampleresponse.json';
import Video from './video.js';

function App() {
  const [videos, setVideos] = useState([]);
  function handleLike(e, id) {
    const index = videos.findIndex((item) => item.id === id);
    const patchedVideo = {...videos[index]};
    console.log(patchedVideo);
    const updatedVideo = {
      id: patchedVideo.id,
      title: patchedVideo.title,
      rating: patchedVideo.rating + 1,
      url: patchedVideo.url,
    };
    const newVideos = [
      ...videos.slice(0, index),
      updatedVideo, // comment to delete something similar but no slice
      ...videos.slice(index + 1),
    ];
    console.log(newVideos);
    setVideos(newVideos);
  }
  function handleDislike(e, id) {
    const index = videos.findIndex((item) => item.id === id);
    const patchedVideo = {...videos[index]};
    console.log(patchedVideo);
    const updatedVideo = {
      id: patchedVideo.id,
      title: patchedVideo.title,
      rating: patchedVideo.rating - 1,
      url: patchedVideo.url,
    };
    const newVideos = [
      ...videos.slice(0, index),
      updatedVideo, // comment to delete something similar but no slice
      ...videos.slice(index + 1),
    ];
    console.log(newVideos);
    setVideos(newVideos);
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/videos')
      .then((response) => setVideos(response.data));
  }, []);

  // axios
  //   .get('http://localhost:5000/videos/id')
  //   .then((response) => console.log(response.data));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {videos.map((item) => (
        <Video
          rating={item.rating}
          title={item.title}
          id={item.id}
          url={item.link}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      ))}
    </div>
  );
}

//NOT SURE ABOUT THIS SECTION
// fetch('/videos').then((response) => console.log(response));

// fetch('/videos', {
//   method: 'post',
// }).then((response) => console.log(response));

// function videos(props) {
//   const [videos, setVideos] = useState(null);
//   useEffect(() => {
//     fetch(`/videos/${props.videosId}/`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((videos) => {
//         setVideos(videos);
//       });
//   }, [props.videosId]);
// }

export default App;
