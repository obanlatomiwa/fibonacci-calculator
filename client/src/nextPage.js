import React from "react";
import { Link } from "react-router-dom";

const nextPage = () => {
  return (
    <div>
      Hello
      <Link to="/"> Go back to the Homepage</Link>
    </div>
  );
};

export default nextPage;