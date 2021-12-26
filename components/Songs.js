import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  console.log("data.playlist=====", playlist);
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <div>
          <Song key={track.track.id} track={track} order={i} />
        </div>
      ))}
      {/* <p>{playlist?.name}</p> */}
    </div>
  );
};

export default Songs;
