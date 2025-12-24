import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Utilisateurs() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch('https://6945530aed253f51719afe95.mockapi.io/project/users');
      if (!response.ok) throw new Error('Erreur de connexion');
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingUser 
      ? `https://6945530aed253f51719afe95.mockapi.io/project/users/${editingUser.id}`
      : 'https://6945530aed253f51719afe95.mockapi.io/project/users';
    const method = editingUser ? 'PUT' : 'POST';
    
    const body = editingUser 
      ? { email: formData.email, role: formData.role }
      : { email: formData.email, password: formData.password, role: formData.role };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setMessage(editingUser ? 'Utilisateur modifié avec succès' : 'Utilisateur créé avec succès');
        setShowModal(false);
        setEditingUser(null);
        setFormData({ email: '', password: '', role: 'user' });
        loadUsers();
      } else {
        setError('Erreur lors de l\'opération');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email || '',
      password: '',
      role: user.role || 'user'
    });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

    try {
      const res = await fetch(`https://6945530aed253f51719afe95.mockapi.io/project/users/${userId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setMessage('Utilisateur supprimé avec succès');
        loadUsers();
      } else {
        setError('Erreur lors de la suppression');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({ email: '', password: '', role: 'user' });
    setShowModal(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const filtered = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
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
              <h2 className="h3 fw-bold">Utilisateurs ({users.length})</h2>
              <button className="btn btn-success" onClick={openCreateModal}>
                + Créer Utilisateur
              </button>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            
            <input
              type="text"
              placeholder="Rechercher utilisateurs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-control mb-4"
            />
            
            {users.length === 0 ? (
              <div className="alert alert-info">Aucun utilisateur trouvé</div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Créé le</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map(u => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.email}</td>
                          <td><span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>{u.role}</span></td>
                          <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                          <td>
                            <button 
                              className="btn btn-warning btn-sm me-2" 
                              onClick={() => handleEdit(u)}
                            >
                              ✏️ Modifier
                            </button>
                            <button 
                              className="btn btn-danger btn-sm" 
                              onClick={() => handleDelete(u.id)}
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
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        {editingUser ? 'Modifier Utilisateur' : 'Créer Utilisateur'}
                      </h5>
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Rôle</label>
                          <select
                            className="form-control"
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            required
                          >
                            <option value="user">Utilisateur</option>
                            <option value="admin">Administrateur</option>
                            <option value="instructor">Instructeur</option>
                          </select>
                        </div>
                        {!editingUser && (
                          <div className="mb-3">
                            <label className="form-label">Mot de passe</label>
                            <input
                              type="password"
                              className="form-control"
                              value={formData.password}
                              onChange={(e) => setFormData({...formData, password: e.target.value})}
                              required
                            />
                          </div>
                        )}
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                          Annuler
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingUser ? 'Modifier' : 'Créer'}
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
