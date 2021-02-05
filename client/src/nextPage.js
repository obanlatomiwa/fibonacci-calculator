import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      Hello
      <Link to="/"> Go back to the Homepage</Link>
    </div>
  );
};
