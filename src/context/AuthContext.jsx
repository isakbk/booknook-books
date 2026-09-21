import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const register = (userData) => {
    // Check if user already exists
    if (users.some((u) => u.email === userData.email)) {
      return { success: false, message: "Email already registered" };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return { success: true, message: "Account created successfully" };
  };

  const login = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: "Login successful" };
    }
    
    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, ...userData } : u))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        register,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
