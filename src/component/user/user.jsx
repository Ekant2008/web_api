import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if not authenticated
    }

    setLoading(true);
    setError(null);

    // Fetch user data with pagination
    axios
      .get(`https://reqres.in/api/users?page=${currentPage}`)
      .then(response => {
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages); // Assuming response has 'total_pages'
        setLoading(false);
      })
      .catch(err => {
        setError("Error fetching users");
        setLoading(false);
        console.error(err);
      });
  }, [currentPage, navigate]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    // You can navigate to an edit page or open a modal to edit user
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Make the delete request
      axios
        .delete(`https://reqres.in/api/users/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id)); // Remove from local state
        })
        .catch(err => {
          alert("Error deleting user");
          console.error(err);
        });
    }
  };

  return (
    <div>
     

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <table className="table table-dark">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar} alt={user.first_name} width="50" />
              </td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
