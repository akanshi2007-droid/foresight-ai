import { createContext, useContext, useState } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('aapda_user');
    return raw ? JSON.parse(raw) : null;
  });

  async function login(email, password) {
    const data = await api.login(email, password);
    localStorage.setItem('aapda_token', data.token);
    localStorage.setItem('aapda_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem('aapda_token');
    localStorage.removeItem('aapda_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
