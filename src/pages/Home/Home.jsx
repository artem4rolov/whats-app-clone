import React from "react";
import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./Home.css";

const Home = () => {
  return (
    <div className="app">
      <div className="app__body">
        {/* sidebar */}
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
