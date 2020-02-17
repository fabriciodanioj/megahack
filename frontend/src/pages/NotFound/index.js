import React from "react";

import './styles.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Sorry, Error 404 - The page cannot be found</h1>
      <h2>
        Go to our <a href="/">home page</a>, and use the menus to navigate to a specific
        section
      </h2>
    </div>
  );
}
