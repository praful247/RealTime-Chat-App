import { useState, useEffect } from 'react';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await fetch('/api/user');
        const userData = await res.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  return { currentUser, loading };
};

export default useCurrentUser;