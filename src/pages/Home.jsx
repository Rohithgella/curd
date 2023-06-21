import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteUser = async (id) => {
    console.log(id);
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        fetchData();
        // Perform any additional actions after successful deletion
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <div style={{marginTop:'15px'}}>
      <table className='styled-table'>
        <thead>
          <tr className="data-item">
            <th style={{textAlign:'center'}}>No.</th>
            <th style={{textAlign:'center'}}>Name</th>
            <th style={{textAlign:'center'}}>Email-id</th>
            <th style={{textAlign:'center'}}>Contact</th>
            <th style={{textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
            {data && data.map((item, index) => (
              <tr className="data-item" key={item.id}>
                <td><h3>{index+1}</h3></td>
                <td><h3>{item.name}</h3></td>
                <td><p>{item.email}</p></td>
                <td><p>{item.contact}</p></td>
                <td>
                  <Link to={`/update/${item._id}`}>
                      <button className='btn btn-edit' >Edit</button>
                  </Link>
                      <button className='btn btn-delete' onClick={()=>onDeleteUser(item._id)}>Delete</button>
                  <Link to={`/view/${item._id}`}>
                      <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
        
    </div>
  );
}

export default Home
