// import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const CourseList = ({ courses }) => {
  // const { user } = useAuth();



  return (
    <div>
      <p>tttt</p>
      {courses.map((course) => (
        <div key={course._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{course.cname}</h2>
          <p>{course.cdetail}</p>
          <div className="mt-2">
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;

