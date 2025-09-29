import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface UserPayload {
  email: string;
  role: 'USER' | 'ADMIN';
}

export const useAuth = () => {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const decoded = jwtDecode<UserPayload>(token);
          setUser(decoded);
        } catch (error) {
          console.error("Token inválido ou expirado:", error);
          setUser(null);
        }
      }
    }
  }, []);

  return { user };
};