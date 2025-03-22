 import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useState, useEffect } from 'react';

const CourseList = ({ courses ,setCourses , editingCourse, setEditingCrouse}) => {
   const { user } = useAuth();
   const [formData, setFormData] = useState({ courseID: '', coursename: '', date: '' });

   const [inputValue, setInputValue] = useState('');


   const weekList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
   const [selectedDay, setSelectedDay] = useState('');
   const filteredCourses = selectedDay
   ? courses.filter(course => course.cweek === selectedDay)
   : courses;


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

      <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
        <option value="">All</option>
        {weekList.map((day) => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
    




    {filteredCourses.map((course) => (
      <div key={course._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
        <h2 className="font-bold">{course.cname}</h2>
        <p>{course.cdetail}</p>
        <p>{course.cweek}</p>
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


