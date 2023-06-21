import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css';

const AddEdit = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    contact: '',
  });

  const { name, email, contact } = state;

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

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Make an API call to update the existing user
        await axios.put(`http://localhost:5000/users/${id}`, state);
      } else {
        // Make an API call to create a new user
        await axios.post('http://localhost:5000/user', state);
      }
      // Redirect to the previous location or perform any other action
      window.history.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Redirect to the home page
    window.location.href = '/';
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-edit">
              {id ? 'Update' : 'Submit'}
            </button>
            <button type="button" onClick={handleCancel} className="btn-delete">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEdit;
