const WhyChoose = () => {
  const benefits = [
    {
      title: "Cours de Qualité",
      desc: "Cours créés par des experts du secteur",
    },
    {
      title: "Interface Moderne",
      desc: "Interface utilisateur intuitive et responsive",
    },
    {
      title: "Progrès Suivi",
      desc: "Suivez vos progrès et obtenez des certificats",
    },
    {
      title: "Accès Flexible",
      desc: "Apprenez à votre rythme, quand vous voulez",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4 text-center">
        Pourquoi choisir <span className="text-primary">SkillHub Academy</span> ?
      </h2>

      <div className="row g-3">
        {benefits.map((b, i) => (
          <div key={i} className="col-sm-6 col-md-3">
            <div className="p-4 bg-light rounded text-center h-100">
              <h5>{b.title}</h5>
              <p className="text-muted">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;

