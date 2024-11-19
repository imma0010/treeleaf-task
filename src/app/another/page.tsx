"use client"
import MessengerTab from "@/components/MessengerTab";
import { FunctionComponent, ReactElement } from "react";

const Home: FunctionComponent = (): ReactElement => {
  return (
    <div className="h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to the Messenger App</h1>
      </div>

      {/* Messenger Tab */}
      <MessengerTab />
    </div>
  );
};

export default Home;
