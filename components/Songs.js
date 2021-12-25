import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  console.log("data.playlist=====", playlist);
  return (
    <div className="text-white">
      {playlist?.tracks.items.map((item) => (
        <div>{item.track.name}</div>
      ))}
      {/* <p>{playlist?.name}</p> */}
    </div>
  );
};

export default Songs;
