import { useEffect, useState } from "react";
import { get, remove } from "../../../services/course.service.js";
import "./CourseContainer.scss";
import CourseCard from "./courseCard/CourseCard.jsx";

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
        <CourseCard
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