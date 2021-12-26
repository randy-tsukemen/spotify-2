import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { signOut } from "next-auth/react";

const colors = [
  "from-red-500",
  "from-orange-500",
  "from-yellow-500",
  "from-green-500",
  "from-teal-500",
  "from-blue-500",
  "from-indigo-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (!playlistId) {
        spotifyApi.getUserPlaylists().then((data) => {
          setPlaylistId(data.body.items[0].id);
        });
      } else {
        spotifyApi
          .getPlaylist(playlistId)
          .then((data) => {
            setPlaylist(data.body);
          })
          .catch((err) => console.log("Something went wrong!", err));
      }
    }
  }, [spotifyApi.getAccessToken(), playlistId]);
  console.log("data.spotifyApi", playlist);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-teal-300 space-x-3
        opacity-90 hover:opacity-80 cursor-pointer rounded-full
        p-1 pr-2 text-white"
          onClick={signOut}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${color} h-80 text-white padding-8`}
      >
        {playlist && (
          <img
            className="h-44 w-44 shadow-2xl"
            src={playlist?.images?.[0]?.url}
            alt=""
          />
        )}
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
