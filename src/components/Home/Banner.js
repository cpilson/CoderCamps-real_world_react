import React from "react";

const Banner = ({ appName }) => {
  // This sucks in the props passed to this function, but ONLY props.appName.
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">{appName.toLowerCase()}</h1>
        <p>A place to meow your knowledge</p>
      </div>
    </div>
  );
};

export default Banner;
