import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import IdleTimer from '../utils/idleTimer';

const useSessionTimeout = () => {
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token !== null) {
      const timer = new IdleTimer({
        timeout: 300, // 300 seconds (5 minutes)
        onTimeout: () => {
          toast('Session expired, Logging out...', {
            icon:"👋"
          });
          clearSessionData()
        },
        onExpired: () => {
          // Handle case when session is already expired on load
          clearSessionData()
        },
      });

      return () => {
        timer.cleanUp();
      };
    }
  }, []);

  const clearSessionData = () => {
    localStorage.removeItem('_expiredTime');
    sessionStorage.clear()
    window.location.href="/signin"
  };
};

export default useSessionTimeout;
