import { useState } from "react";
import { categoryImages } from "../utils/categoryImages";

const CourseCard = ({ course }) => {
  const [showDetails, setShowDetails] = useState(false);
  const image =
    categoryImages[course.categorie] 

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">

        {/* Image by Category */}
        <img
          src={image}
          className="card-img-top"
          alt={course.categorie}
        />

        {/* Level badge */}
        <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
          {course.niveau}
        </span>

        <div className="card-body">
          <span className="badge bg-secondary mb-2">
            {course.categorie}
          </span>

          <h5 className="card-title mt-2">{course.titre}</h5>

          <p className="text-muted mb-1">
            👨‍🏫 {course.instructeur}
          </p>

          <p className="card-text small text-muted">
            {course.description}
          </p>

          <ul className="list-unstyled small">
            <li>⏱ Durée : {course.duree}</li>
            <li>👥 Étudiants : {course.nombre_etudiants}</li>
            <li>
              🎓 Certification :{" "}
              {course.certification ? "Oui" : "Non"}
            </li>
          </ul>
        </div>

        <div className="card-footer bg-white border-0 d-flex justify-content-between">
          <strong className="text-success">
            {course.prix} €
          </strong>

          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowDetails(true)}
          >
            Voir le cours
          </button>
        </div>
      </div>

      {/* Modal for Course Details */}
      {showDetails && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{course.titre}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDetails(false)}
                />
              </div>
              <div className="modal-body">
                <img 
                  src={image} 
                  alt={course.titre} 
                  className="img-fluid mb-3" 
                  style={{maxHeight: '300px', objectFit: 'cover', width: '100%'}}
                />
                
                <div className="mb-3">
                  <span className="badge bg-secondary me-2">{course.categorie}</span>
                  <span className="badge bg-primary">{course.niveau}</span>
                  <span className="badge bg-warning ms-2">{course.status}</span>
                </div>

                <h6 className="mt-4">📝 Description</h6>
                <p>{course.description}</p>

                <h6>👨‍🏫 Instructeur</h6>
                <p><strong>{course.instructeur}</strong></p>

                <div className="row">
                  <div className="col-md-6">
                    <h6>⏱ Durée</h6>
                    <p>{course.duree}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>👥 Nombre d'étudiants</h6>
                    <p>{course.nombre_etudiants}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h6>🎓 Certification</h6>
                    <p>{course.certification ? '✅ Oui' : '❌ Non'}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>💰 Prix</h6>
                    <p className="text-success"><strong>{course.prix} €</strong></p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDetails(false)}
                >
                  Fermer
                </button>
              
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
