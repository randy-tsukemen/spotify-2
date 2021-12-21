import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "./Center";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        <Center />
        {/* Center */}
      </main>
    </div>
  );
}
