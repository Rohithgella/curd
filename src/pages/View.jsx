import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './View.css';
import nam from '../img/user.png';
import abc from '../img/email.png';
import def from "../img/phone-call.png";

function View() {
  const [state, setState] = useState({
    name: '',
    email: '',
    contact: '',
  });


  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setState({ ...response.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contact-card">
    <div className="content-container">
      <div className="logo-container">
        <img className="logo" src={nam} alt="Logo 1" />
        <img className="logo" src={abc} alt="Logo 2" />
        <img className="logo" src={def} alt="Logo 3" />
      </div>
      <div className="info-container">
      <h2>Name: {state.name}</h2>
      <h2>Email: {state.email}</h2>
      <h2>Contact: {state.contact}</h2>
      </div>
    </div>
  </div>
  )
}

export default View