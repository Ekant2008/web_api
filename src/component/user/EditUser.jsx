import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch the user data by ID
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then(response => {
        setUser(response.data.data); // Pre-fill form with existing user data
        setLoading(false);
      })
      .catch(err => {
        setError("Error fetching user data");
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Make the PUT request to update the user
    axios
      .put(`https://reqres.in/api/users/${id}`, user)
      .then(() => {
        navigate("/users"); // Redirect to the list of users after successful update
      })
      .catch(err => {
        setError("Error updating user");
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
