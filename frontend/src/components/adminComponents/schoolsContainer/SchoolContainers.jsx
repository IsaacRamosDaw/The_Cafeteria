import SchoolCard from "../schoolCard/SchoolCard";
import "./SchoolsContainers.scss";

function SchoolsContainers() {
  let schools = [
    {
      name: "School 1",
      image: "/images/ImgMenus/sandwiches.jpg",
    },
    {
      name: "School 2",
      image: "/images/ImgMenus/sandwiches.jpg",
    },
    {
      name: "School 3",
      image: "/images/ImgMenus/sandwiches.jpg",
    },
  ];

  return (
    <div className="section-container-school-cards">
      {schools.map((e, index) => {
        return <SchoolCard key={index} name={e.name} image={e.image} />;
      })}
    </div>
  );
}

export default SchoolsContainers;
