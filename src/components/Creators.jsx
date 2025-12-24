const Creators = () => {
  const team = [
    {
      name: "Oussama Faddoul",
      role: "Developer",
      image: "https://img.lemde.fr/2015/05/20/0/0/2100/1464/664/0/75/0/84bfb50_e386a450f6784b2eb1366b9d3c7ba984-e386a450f6784b2eb1366b9d3c7ba984-0.jpg",
    },
    {
      name: "Mohammed Eloudyy",
      role: "Developer",
      image: "https://media.ouest-france.fr/v1/pictures/MjAxNDA1ODExMzIzY2RkYzVhNDVlMGFhMTA3ODE2M2VkMTYyZGY?width=1260&height=708&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=847ad7b6877be3d3d68b4345a649f3b999a47fe08b546da478d9c027453c26d1",
    },
    {
      name: "Ilyass Faraji",
      role: "Developer",
      image: "https://media.lesechos.com/api/v1/images/view/5d428f648fe56f12265f6a54/1280x720/0601661770075-web-tete.jpg",
    },
  ];

  return (
     <>
    <div className="container my-5 text-center">
      <h2 className="fw-bold mb-4">Meet the Creators</h2>
      <div className="row justify-content-center">
        {team.map((member, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="p-3 border rounded shadow-sm">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-circle mb-3"
                width="120"
                height="120"
                />
              <h5>{member.name}</h5>
              <p className="text-muted">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; 2025 SkillHub Academy. All rights reserved.</p>
        <p className="mb-0">Created by Oussama, Mohammed & Ilyass</p>
      </div>
    </footer>
               </>
  );
};

export default Creators;
