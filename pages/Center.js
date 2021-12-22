import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

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
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-teal-300 space-x-3
        opacity-90 hover:opacity-80 cursor-pointer rounded-full
        p-1 pr-2"
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
        {/* <img src="https://picsum.photos/id/237/200/300" alt="" /> */}
        <h1>hello</h1>
      </section>
    </div>
  );
};

export default Center;
