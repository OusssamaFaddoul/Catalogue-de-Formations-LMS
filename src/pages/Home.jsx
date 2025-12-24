import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../mockAPI/coursesApi";
import CourseCard from "../components/CourseCard";
import Hero from "../components/Hero";
import WhyChoose from "../components/WhyChoose";
import Creators from "../components/Creators";


const categories = [
  "Tous",
  "Développement",
  "Design",
  "Marketing",
  "Business",
  "Langues",
];

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Fetch courses on mount
  useEffect(() => {
    // Get current user ID from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserId(userData.id);
    }

    getCourses()
      .then(data => {
        // Keep only published courses
        const published = data.filter(
          c => c.status === "Publié"
        );
        setCourses(published);
        setFilteredCourses(published);
      })
      .catch(err => console.error(err))
      setLoading(false);
  }, []);

  // Filter courses based on search and category
  useEffect(() => {
    let result = courses;

    // 🔍 Apply search filter first
      const lowerSearch = search.toLowerCase();
      result = result.filter(c => c.titre.toLowerCase().includes(lowerSearch));
    

    // 🏷 Apply category rules
    if (selectedCategory === "Tous") {
      // Keep only 1 course per category
      const categoriesMap = {};
      result.forEach(c => {
        if (!categoriesMap[c.categorie]) {
          categoriesMap[c.categorie] = c;
        }
      });
      result = Object.values(categoriesMap);
    } else {
      // Show up to 3 courses for the selected category
      result = result.filter(c => c.categorie === selectedCategory).slice(0, 3);
    }

    setFilteredCourses(result);
  }, [search, selectedCategory, courses]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">SkillHub Academy</Link>
          <div className="d-flex ms-auto">
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
          </div>
        </div>
      </nav>

      <Hero />

      <div className="container my-5">
        <h2 className="fw-bold mb-4">Catalogue de Cours</h2>

        {/* 🔍 SEARCH */}
        <div className="input-group mb-3">
          
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un cours..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* 🏷 CATEGORY SELECT */}
        <div className="mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-sm me-2 mb-2 ${
                selectedCategory === cat
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📚 COURSES */}
        {loading ? (
          <p>Chargement...</p>
        ) : filteredCourses.length === 0 ? (
          <p>Aucun cours trouvé.</p>
        ) : (
          <div className="row">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} userId={userId} />
            ))}
          </div>
        )}
      </div>
      <WhyChoose/>
      <Creators/>
    </>
  );
};

export default Home;
