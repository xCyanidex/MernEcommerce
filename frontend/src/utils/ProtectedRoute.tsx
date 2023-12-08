
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
 const user=1;
  const location = useLocation();



  // If there's no user, redirect to the sign-in page
  if (!user) {
    return (
      <Navigate to="/sign-in?loggedin=0" state={{ from: location }} replace />
    );
  }

  // If the user is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
