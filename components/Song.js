import useSpotify from "../hooks/useSpotify";

const Song = ({ order, track }) => {
  return (
    <div>
      <div>
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div>
          <p>{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
