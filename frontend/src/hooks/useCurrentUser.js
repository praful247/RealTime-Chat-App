import { useState, useEffect } from 'react';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(currentUser);
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
       
        const storedUser = localStorage.getItem('currentUser');
        if(storedUser){
          setCurrentUser(JSON.parse(storedUser));
          setLoading(false);
        }

        const res = await fetch('/api/user',);
        if(!res.ok) throw new Error('Failed to fetch current user');
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