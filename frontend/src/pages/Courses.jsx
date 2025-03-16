import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import CourseList from '../components/CourseList';
import { useAuth } from '../context/AuthContext';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/api/courses', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCourses(response.data);
      } catch (error) {
        alert('Failed to fetch tasks.');
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <p>123</p>
      
      <CourseList courses={courses} />
      <p>456</p>
    </div>
  );
};

export default Courses;

