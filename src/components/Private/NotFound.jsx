import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
        <main className="main">
            <div className="container">
                <div className="register d-flex justify-content-center align-items-center position-absolute">
                  <div className="card w-75 bg-dark border border-light text-light text-center p-2">
                    <div className="card-body">
                      <h1 className="f">404</h1>
                      <h3 className="card-text fs-4">Page not found</h3>
                      <i className='f'>It's looking like you may have taken a wrong turn. Don't worry it happens to the most of us.</i> <br />
                      <Link to="/"><button className="btn btn-success mt-3">Go to the back.</button></Link>
                    </div>
                  </div>
                </div>
            </div>
        </main>
    </>
  );
};

export default NotFound;
