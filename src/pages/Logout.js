import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {
  const { unsetUser, setUser } = useContext(UserContext);

  useEffect(() => {
    // Perform the logout logic
    unsetUser(); // Clear user context or perform logout actions

    // You should not update state that triggers a re-render in useEffect, which can cause an infinite loop
    // If `unsetUser` updates state causing re-render, you need to handle this logic correctly in context or parent component
  }, [unsetUser]); // Ensure useEffect runs only once by passing an empty dependency array

  return <Navigate to="/" />;
}
