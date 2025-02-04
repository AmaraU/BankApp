const ProtectedRoute = ({ children }) => {
  const authToken = sessionStorage.getItem("authToken");

  if (!authToken) {
    window.location.href = "/signin";
  }

  return children;
};

export default ProtectedRoute;
