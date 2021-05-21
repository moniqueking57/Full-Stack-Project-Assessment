import {useState} from 'react';
import './App.css';
import example from './exampleresponse.json';
import Video from './video.js';

function App() {
  console.log(example);
  const [videos, setVideos] = useState(example);
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
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {videos.map((item) => (
        <Video
          title={item.title}
          id={item.id}
          url={item.url}
          rating={item.rating}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      ))}
    </div>
  );
}

export default App;
