import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorBoundaryInner from "./ErrorBoundryInner";

const ErrorBoundary = ({children}) => {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [location.key]);
  return (
    <ErrorBoundaryInner 
      hasError={hasError} 
      setHasError={setHasError}
    >
      {children}
    </ErrorBoundaryInner>

    
  );
  
}

export default ErrorBoundary
