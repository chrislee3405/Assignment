import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import CourseList from '../components/CourseList';

import { useAuth } from '../context/AuthContext';

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

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
      
      <CourseList courses={courses}  setCourses={setCourses} editingCourse={editingCourse} setEditingCourse={setEditingCourse}/>

    </div>
  );
};

export default Courses;

