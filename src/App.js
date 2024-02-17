import React from "react";
import "./App.css";

import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

// import bg from "./Components/bg.jpg";

function App() {
  return (
    <div
      className="text-center"
      id="mainWindow"
      // backgroundImage={require("./Components/bg.jpg")}
      style={
        {
          // backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
          // backgroundImage: require("./Components/bg.jpg"),
          // background: "linear-gradient(to bottom, #f7aa62 0%, white 100%)",
          // backgroundImage: `url(${bg})`,
        }
      }
    >
      <Header creator="Vaibhav" />

      <Home creator="Vaibhav" />

      <Footer />
    </div>
  );
}

export default App;
