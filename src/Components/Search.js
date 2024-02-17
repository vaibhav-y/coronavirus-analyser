import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faHandHoldingHeart,
  faPhoneVolume,
  faViruses,
} from "@fortawesome/free-solid-svg-icons";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Search(props) {
  const [search, setSearch] = useState(false);

  let query, link;

  if (search) {
    query = document.getElementById("searchbox").value.toLowerCase();
    document.getElementById("searchbutton").className =
      "btn btn-outline-success rounded-pill mx-auto w-25";
    document.getElementById("searchforanything").className = "text-success";
    document.getElementById("searchforanything").innerHTML =
      "Search for Anything!";
    document.getElementById("searchbox").className =
      "form-control w-75 rounded-pill mx-auto border border-success small ";

    console.log(query);

    if (query === "home") {
      document.getElementById("searchbutton").innerHTML = "Searched for Home";
      link = (
        <a href="/" className="text-success">
          <br />
          <br />
          <FontAwesomeIcon icon={faHome} />
          <br />
          Click here to go to home!
        </a>
      );
    } else if (
      query === "corona" ||
      query === "coronavirus" ||
      query === "covid19"
    ) {
      document.getElementById("searchbutton").innerHTML =
        "Searched for Covid19";
      link = (
        <a href="/covid19/" className="text-success">
          <br />
          <br />
          <FontAwesomeIcon icon={faViruses} />
          <br />
          Click here to go to live covid19 update page!
        </a>
      );
    } else if (query === "donate") {
      document.getElementById("searchbutton").innerHTML = "Searched for Donate";
      link = (
        <a href="/donate/" className="text-success">
          <br />
          <br />
          <FontAwesomeIcon icon={faHandHoldingHeart} />
          <br />
          Click here to go to donation page!
        </a>
      );
    } else if (query === "contact" || query === "contact us") {
      document.getElementById("searchbutton").innerHTML =
        "Searched for Contact";
      link = (
        <a href="/contact-us/" className="text-success">
          <br />
          <br />
          <FontAwesomeIcon icon={faPhoneVolume} />
          <br />
          Click here to go to contact page!
        </a>
      );
    } else if (query === "") {
      document.getElementById("searchbutton").innerHTML = "Search";
      link = null;
    } else {
      document.getElementById("searchbutton").innerHTML = "Sorry!";
      document.getElementById("searchbutton").className =
        "btn btn-outline-danger rounded-pill mx-auto w-25";
      document.getElementById("searchforanything").className = "text-danger";
      document.getElementById("searchforanything").innerHTML =
        "Search for Anything else!";
      document.getElementById("searchbox").className =
        "form-control w-75 rounded-pill mx-auto border border-danger small ";
      setSearch(false);
    }
  }

  return (
    <div
      className="card border-info mx-auto text-center bg-dark text-white shadow-lg rounded-pill"
      style={{ top: 100, width: 800, height: 400 }}
    >
      <div className="card-header font bg-info h4 text-white font-italic rounded-pill mx-auto w-75">
        Welcome to the Search window!
      </div>
      <div className="card-body text-success h5">
        <br />
        <span id="searchforanything">
          <FontAwesomeIcon icon={faSearch} /> Search for Anything!
        </span>
        <br />
        <br />
        <input
          className="form-control w-75 rounded-pill mx-auto border border-success small"
          type="text"
          placeholder="Ex: Search for 'Covid19' to know about latest coronavirus update!"
          id="searchbox"
        />
        <br />
        <button
          className="btn btn-outline-success rounded-pill mx-auto w-25"
          type="button"
          onClick={() => setSearch(true)}
          //   onClick="location.href='https://www.google.com/'"
          id="searchbutton"
        >
          Search
        </button>
        {link}
      </div>

      <div className="card-footer text-muted font-italic small rounded-pill mx-auto w-75">
        Last updated 3 mins ago
      </div>
      {console.log(document.getElementById("searchforanything"))}
    </div>
  );
}

export default Search;
