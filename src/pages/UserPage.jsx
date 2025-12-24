import { useEffect, useState } from "react";
import { getCourses } from "../mockAPI/coursesApi";
import CourseCard from "../components/CourseCard";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const categories = [
  "Tous",
  "Développement",
  "Design",
  "Marketing",
  "Business",
  "Langues",
];

export default function UserPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    getCourses()
      .then(data => {
        
        const published = data.filter(
          c => c.status === "Publié"
        );
        setCourses(published);
        setFilteredCourses(published);
      })
      .catch(err => console.error(err))
      setLoading(false);
  }, []);

 
  useEffect(() => {
    let result = courses;

    
      const lowerSearch = search.toLowerCase();
      result = result.filter(c => c.titre.toLowerCase().includes(lowerSearch));
    

   
    if (selectedCategory !== "Tous") {
      result = result.filter(c => c.categorie === selectedCategory);
    }

    setFilteredCourses(result);
  }, [search, selectedCategory, courses]);

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <h2 className="fw-bold mb-4">Mes Cours</h2>

      
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un cours..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

       
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

       
        {loading ? (
          <p>Chargement...</p>
        ) : filteredCourses.length === 0 ? (
          <p>Aucun cours trouvé.</p>
        ) : (
          <div className="row">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}