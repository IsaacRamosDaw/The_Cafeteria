import { useEffect, useState } from "react";
import CoffeCard from "../courseCard/CourseCard.jsx";
import { get, remove } from "../../../services/courseService.js";
import "./CourseContainer.scss";

function CourseContainer() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      setCourses(data);
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await remove(id);
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
  };

  return (
    <section className="section-container-course-cards">
      {courses.map((course) => (
        <CoffeCard
          key={course.id}
          name={course.name}
          id={course.id}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default CourseContainer;