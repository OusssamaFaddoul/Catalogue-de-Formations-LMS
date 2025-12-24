import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <div className="container d-flex justify-content-between align-items-center">
        <small>© {new Date().getFullYear()} Catalogue de Formations</small>
      </div>
    </footer>
  );
}

