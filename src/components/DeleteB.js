import React from 'react';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';

const DeleteMovie = ({ blogId, onDeleteSuccess }) => {
    console.log("ETOOOOOOOOOOOOO:",blogId);

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/blog/deleteBlog/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete movie');
        }
        return res.json();
      })
      .then(data => {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Movie successfully deleted."
        });
        onDeleteSuccess();
      })
      .catch(error => {
        console.error('Error deleting movie:', error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: `Failed to delete movie. Error details: ${error.message}` // Display error message
        });
      });
  };

  return (
    <Button variant="danger m-2" onClick={handleDelete}>Delete</Button>
  );
};

export default DeleteMovie;
