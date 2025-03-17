 import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useState, useEffect } from 'react';

const CourseList = ({ courses ,setCourses , editingCourse, setEditingCrouse}) => {
   const { user } = useAuth();
   const [formData, setFormData] = useState({ courseID: '', coursename: '', date: '' });

   const [inputValue, setInputValue] = useState('');





const handleSubmit = async (e, courseId, cname) => {
  e.preventDefault();
  try {
    
    const formDataWithId = { ...formData, courseID: courseId,coursename: cname}; 



    const checkExist = await axiosInstance.get('/api/tasks',{
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const checkExistID = checkExist.data.map(task => task.courseID);
    if (checkExistID.includes(courseId)) {
      alert('Course already enrolled');
    } else {
      const response = await axiosInstance.post('/api/tasks', formDataWithId, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    }


  } catch (error) {
    alert('Failed to save task.');
  }
};

return (
  <div>
    {courses.map((course) => (
      <div key={course._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
        <h2 className="font-bold">{course.cname}</h2>
        <p>{course.cdetail}</p>

        <form onSubmit={(e) => handleSubmit(e, course._id, course.cname)} className="bg-white p-6 shadow-md rounded mb-6">
          <input type="hidden" value='aaaaaaa' onChange={(e) => setInputValue(e.target.value)} />
          <button type="submit">{editingCourse ? 'Update Button' : 'Add Button'}</button>
        </form>

        <div className="mt-2"></div>
      </div>
    ))}
  </div>
);
};

export default CourseList;


