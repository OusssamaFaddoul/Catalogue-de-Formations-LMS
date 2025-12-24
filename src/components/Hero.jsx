import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="fw-bold">
            Développez vos compétences avec <span className="text-primary">SkillHub Academy</span>
          </h1>
          <p className="text-muted mt-3">
            Découvrez une vaste sélection de cours en ligne pour développer vos compétences professionnelles.
          </p>
          <Link to="/signup" className="btn btn-danger btn-lg mt-3">
            Explorer les Cours
          </Link>
        </div>

        <div className="col-md-6 text-center">
          <img
            src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0ZpuBpI8Pja6sEQtmu8zVhAzGNTU9zVlqeg&s "
            alt="learning"
            className="img-fluid "
            style={{height : '300px'}}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
