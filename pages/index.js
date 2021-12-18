import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="">
      <main>
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
      </main>
    </div>
  );
}
