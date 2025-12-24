import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container text-center mt-5">
      <h1>SkillHub Academy 🎓</h1>
      <p>Explore high-quality online courses</p>

      <Link to="/catalogue" className="btn btn-primary">
        Browse Courses
      </Link>
    </div>
  );
}
