import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faAddressCard,
  faHouseUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function Contact(props) {
  const [showMsg, setShowMsg] = useState(false);

  let msg;

  if (showMsg) {
    msg = (
      <h5 className="text-success">
        Thankyou {document.getElementById("firstname").value}. Details submitted
        successfully!
        <br />
      </h5>
    );
  }

  return (
    <div
      className="card border-info mx-auto text-center bg-dark text-white shadow-lg rounded-pill"
      style={{ top: 100, width: 800, height: 400 }}
    >
      <div className="card-header font bg-info h4 text-white font-italic rounded-pill mx-auto w-75">
        Welcome to the Contact window!
      </div>

      <h5>
        <br />
        <FontAwesomeIcon icon={faAddressCard} /> Vaibhav Yadav
        <br />
        <br />
        <FontAwesomeIcon icon={faPhone} /> (+91) 8218-4734-96
        <br />
        <br />
        <FontAwesomeIcon icon={faEnvelope} />{" "}
        <a href="mailto:vaibhavy.iitk@gmail.com" className="text-white">
          vaibhavy.iitk@gmail.com
        </a>
        <br />
        <br />
        <FontAwesomeIcon icon={faHouseUser} /> 99, Chinchpokli Bandar, Khaon
        Gali, Mumbai
      </h5>
      <div className="card-body">
        <form class="needs-validation" novalidate>
          <div className="input-group mx-auto w-75">
            <div className="input-group-prepend">
              <span class="input-group-text" type="text" disabled>
                Your Name
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="firstname"
              placeholder="First Name"
              required
            />
            <div class="invalid-feedback">Please enter first name.</div>
            <input
              type="text"
              className="form-control"
              id="lastname"
              placeholder="Last Name"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-success"
                type="button"
                onClick={() => setShowMsg(true)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {msg}
      <div className="card-footer text-muted font-italic small rounded-pill mx-auto w-75">
        Last updated 3 mins ago
      </div>
    </div>
  );
}

export default Contact;
