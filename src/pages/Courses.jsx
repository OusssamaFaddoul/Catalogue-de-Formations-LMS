import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ 
    titre: '', 
    description: '',
    categorie: 'Développement',
    prix: 0,
    duree: '10h',
    instructeur: '',
    niveau: 'Débutant',
    nombre_etudiants: 0,
    certification: false,
    status: 'Publié'
  });
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await fetch('https://6945530aed253f51719afe95.mockapi.io/project/cours');
      if (!response.ok) throw new Error('Erreur de connexion');
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingCourse 
      ? `https://6945530aed253f51719afe95.mockapi.io/project/cours/${editingCourse.id}`
      : 'https://6945530aed253f51719afe95.mockapi.io/project/cours';
    const method = editingCourse ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setMessage(editingCourse ? 'Cours modifié avec succès' : 'Cours créé avec succès');
        setShowModal(false);
        setEditingCourse(null);
        setFormData({ 
          titre: '', 
          description: '',
          categorie: 'Développement',
          prix: 0,
          duree: '10h',
          instructeur: '',
          niveau: 'Débutant',
          nombre_etudiants: 0,
          certification: false,
          status: 'Publié'
        });
        loadCourses();
      } else {
        setError('Erreur lors de l\'opération');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setShowModal(true);
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce cours ?')) return;

    try {
      const res = await fetch(`https://6945530aed253f51719afe95.mockapi.io/project/cours/${courseId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setMessage('Cours supprimé avec succès');
        loadCourses();
      } else {
        setError('Erreur lors de la suppression');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormData({ 
      titre: '', 
      description: '',
      categorie: 'Développement',
      prix: 0,
      duree: '10h',
      instructeur: '',
      niveau: 'Débutant',
      nombre_etudiants: 0,
      certification: false,
      status: 'Publié'
    });
    setShowModal(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const filtered = courses.filter(c =>
    c.titre?.toLowerCase().includes(search.toLowerCase()) ||
    c.categorie?.toLowerCase().includes(search.toLowerCase()) ||
    c.instructeur?.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  if (loading) {
    return <div className="p-4 text-center"><div className="spinner-border"></div></div>;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-light" style={{background: 'linear-gradient(to right, #000000, #1a1a1a)', margin: 0, padding: '12px 0'}}>
        <div className="container-fluid">
          <h3 className="navbar-brand text-white mb-0">Admin Dashboard</h3>
          <button className="btn btn-light btn-sm" onClick={logout}>Déconnexion</button>
        </div>
      </nav>

      <div className="d-flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="bg-dark text-white p-3" style={{minWidth: '200px', minHeight: '100vh', margin: 0}}>
            <button 
              className="btn btn-outline-light btn-sm w-100 mb-3"
              onClick={() => setSidebarOpen(false)}
            >
              ✕ Fermer
            </button>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="btn btn-dark w-100 text-start text-white" style={{textDecoration:'none'}}>
                  🏠 Accueil
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/admin" className="btn btn-dark w-100 text-start text-white" style={{textDecoration:'none'}}>
                  📊 Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/courses" className="btn btn-dark w-100 text-start text-white" style={{textDecoration:'none'}}>
                  📖 Gestion Cours
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/utilisateurs" className="btn btn-dark w-100 text-start text-white" style={{textDecoration:'none'}}>
                  👥 Utilisateurs
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Main Content */}
        <div style={{flex: 1, width: '100%', margin: 0}}>
          {!sidebarOpen && (
            <button 
              className="btn btn-outline-dark btn-sm m-3"
              onClick={() => setSidebarOpen(true)}
            >
              ☰ Menu
            </button>
          )}
          <div className="p-4" style={{marginTop: 0}}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 fw-bold">Gestion des Cours ({courses.length})</h2>
              <button className="btn btn-success" onClick={openCreateModal}>
                + Créer Cours
              </button>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            
            <input
              type="text"
              placeholder="Rechercher cours..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-control mb-4"
            />
            
            {courses.length === 0 ? (
              <div className="alert alert-info">Aucun cours trouvé</div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Catégorie</th>
                        <th>Instructeur</th>
                        <th>Prix</th>
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map(c => (
                        <tr key={c.id}>
                          <td>{c.id}</td>
                          <td>{c.titre}</td>
                          <td><span className="badge bg-secondary">{c.categorie}</span></td>
                          <td>{c.instructeur}</td>
                          <td>{c.prix}€</td>
                          <td><span className={`badge ${c.status === 'Publié' ? 'bg-success' : 'bg-warning'}`}>{c.status}</span></td>
                          <td>
                            <button 
                              className="btn btn-warning btn-sm me-2" 
                              onClick={() => handleEdit(c)}
                            >
                              ✏️ Modifier
                            </button>
                            <button 
                              className="btn btn-danger btn-sm" 
                              onClick={() => handleDelete(c.id)}
                            >
                              🗑️ Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-4 d-flex justify-content-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Modal */}
            {showModal && (
              <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        {editingCourse ? 'Modifier Cours' : 'Créer Cours'}
                      </h5>
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Titre</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.titre}
                              onChange={(e) => setFormData({...formData, titre: e.target.value})}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Instructeur</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.instructeur}
                              onChange={(e) => setFormData({...formData, instructeur: e.target.value})}
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows="3"
                          ></textarea>
                        </div>

                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label className="form-label">Catégorie</label>
                            <select
                              className="form-control"
                              value={formData.categorie}
                              onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                            >
                              <option>Développement</option>
                              <option>Design</option>
                              <option>Marketing</option>
                              <option>Business</option>
                              <option>Langues</option>
                            </select>
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">Prix (€)</label>
                            <input
                              type="number"
                              className="form-control"
                              value={formData.prix}
                              onChange={(e) => setFormData({...formData, prix: Number(e.target.value)})}
                              min="0"
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">Durée</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.duree}
                              onChange={(e) => setFormData({...formData, duree: e.target.value})}
                              placeholder="ex: 10h"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label className="form-label">Niveau</label>
                            <select
                              className="form-control"
                              value={formData.niveau}
                              onChange={(e) => setFormData({...formData, niveau: e.target.value})}
                            >
                              <option>Débutant</option>
                              <option>Intermédiaire</option>
                              <option>Avancé</option>
                            </select>
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">Étudiants</label>
                            <input
                              type="number"
                              className="form-control"
                              value={formData.nombre_etudiants}
                              onChange={(e) => setFormData({...formData, nombre_etudiants: Number(e.target.value)})}
                              min="0"
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">Statut</label>
                            <select
                              className="form-control"
                              value={formData.status}
                              onChange={(e) => setFormData({...formData, status: e.target.value})}
                            >
                              <option>Publié</option>
                              <option>Brouillon</option>
                              <option>Archivé</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-check mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="certification"
                            checked={formData.certification}
                            onChange={(e) => setFormData({...formData, certification: e.target.checked})}
                          />
                          <label className="form-check-label" htmlFor="certification">
                            Certification disponible
                          </label>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                          Annuler
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingCourse ? 'Modifier' : 'Créer'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
