import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";

export default function AdminPage() {
  const [stats, setStats] = useState({ users: 0, courses: 0 });
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Charger les utilisateurs
      const usersResponse = await fetch('https://6945530aed253f51719afe95.mockapi.io/project/users');
      const usersData = await usersResponse.json();
      setUsers(Array.isArray(usersData) ? usersData : []);

      // Charger les cours
      const coursesResponse = await fetch('https://6945530aed253f51719afe95.mockapi.io/project/cours');
      const coursesData = await coursesResponse.json();
      setCourses(Array.isArray(coursesData) ? coursesData : []);

      // Calculer les statistiques
      setStats({
        users: usersData.length || 0,
        courses: coursesData.length || 0
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError('Erreur lors du chargement des données');
      setLoading(false);
    }
  };

  // Préparer les données pour les graphiques
  const chartData = [
    { name: 'Utilisateurs', value: stats.users },
    { name: 'Cours', value: stats.courses }
  ];

  const categoryData = courses.reduce((acc, course) => {
    const existing = acc.find(c => c.name === course.categorie);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: course.categorie, value: 1 });
    }
    return acc;
  }, []);

  const roleData = users.reduce((acc, user) => {
    const existing = acc.find(r => r.name === user.role);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: user.role, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="p-4 text-center"><div className="spinner-border"></div></div>;
  }

  if (error) {
    return <div className="p-4"><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <>
      {/* Simple Navbar */}
      <nav className="navbar navbar-light" style={{background: 'linear-gradient(to right, #000000, #1a1a1a)', margin: 0, padding: '12px 0'}}>
        <div className="container-fluid">
          <h3 className="navbar-brand text-white mb-0">Admin Dashboard</h3>
          <button className="btn btn-light btn-sm" onClick={logout}>Déconnexion</button>
        </div>
      </nav>

      <div className="d-flex">
        {/* Simple Sidebar */}
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
      <h2 className="h3 fw-bold mb-4">Tableau de Bord Admin</h2>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3>{stats.users}</h3>
              <p>Total Utilisateurs</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3>{stats.courses}</h3>
              <p>Total Cours</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3>{users.filter(u => u.createdAt && new Date(u.createdAt).toDateString() === new Date().toDateString()).length}</h3>
              <p>Nouveaux Aujourd'hui</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3>{Math.floor(Math.random() * 50) + 10}</h3>
              <p>Sessions Actives</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users and All Courses */}
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title fw-bold">Distribution par Catégorie</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title fw-bold">Distribution par Rôle</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title fw-bold">Comparaison Globale</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users and All Courses */}
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Utilisateurs Récents</h5>
              {users.slice(0, 5).map(user => (
                <div key={user.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div>
                    <strong>{user.email}</strong><br/>
                    <small className="text-muted">{user.role}</small>
                  </div>
                  <small className="text-muted">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Tous les Cours ({courses.length})</h5>
              <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                {courses.map(course => (
                  <div key={course.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                      <strong>{course.titre}</strong><br/>
                      <small className="text-muted">Par {course.instructeur} - {course.categorie}</small>
                    </div>
                    <div className="text-end">
                      <small className="text-muted">{course.duree}</small><br/>
                      <span className={`badge ${course.statut === 'actif' ? 'bg-success' : 'bg-secondary'} badge-sm`}>
                        {course.statut}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
    </>
  );
}