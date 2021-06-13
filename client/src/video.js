const Video = (props) => {
  console.log(props);
  //const url = props.url.split('=')[1];
  return (
    <div>
      <h2>{props.title}</h2>
      <iframe
        width="560"
        height="315"
        //src={`https://www.youtube.com/embed/${url}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p>Rating: {props.rating}</p>
      <button onClick={(e) => props.handleLike(e, props.id)}>👍</button>
      <button onClick={(e) => props.handleDislike(e, props.id)}>👎</button>
    </div>
  );
};

export default Video;
