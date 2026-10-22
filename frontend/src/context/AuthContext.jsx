import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

/**
 * AuthProvider
 *
 * Holds { customer, token } in state.
 * Persists to localStorage so a page refresh keeps the user logged in.
 * Restores session on mount, clearing it when the token is expired or malformed.
 */
export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('driveEasyToken');
    const storedCustomer = localStorage.getItem('driveEasyCustomer');

    if (storedToken && storedCustomer) {
      try {
        // Decode JWT payload (base64url) to check expiry — no library required
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem('driveEasyToken');
          localStorage.removeItem('driveEasyCustomer');
        } else {
          setToken(storedToken);
          setCustomer(JSON.parse(storedCustomer));
        }
      } catch {
        // Token is malformed — wipe it
        localStorage.removeItem('driveEasyToken');
        localStorage.removeItem('driveEasyCustomer');
      }
    }
  }, []);

  /** Call after a successful login API response */
  const login = (customerData, jwt) => {
    setCustomer(customerData);
    setToken(jwt);
    localStorage.setItem('driveEasyToken', jwt);
    localStorage.setItem('driveEasyCustomer', JSON.stringify(customerData));
  };

  /** Call when the user clicks Logout */
  const logout = () => {
    setCustomer(null);
    setToken(null);
    localStorage.removeItem('driveEasyToken');
    localStorage.removeItem('driveEasyCustomer');
  };

  return (
    <AuthContext.Provider value={{ customer, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/** Convenience hook — use inside any component wrapped by AuthProvider */
export const useAuth = () => useContext(AuthContext);
