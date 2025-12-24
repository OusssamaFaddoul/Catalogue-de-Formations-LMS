import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UserNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Catalogue</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
          </ul>
          <div className="d-flex">
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>Déconnexion</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
