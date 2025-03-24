 import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseList = ({ courses ,setCourses , editingCourse, setEditingCrouse}) => {
   const { user } = useAuth();
   const [formData, setFormData] = useState({ courseID: '', coursename: '', date: '' });
   
   const [inputValue, setInputValue] = useState('');


   const weekList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
   const [selectedDay, setSelectedDay] = useState('');
   const filteredCourses = selectedDay ? courses.filter(course => course.cweek === selectedDay) : courses;
   const navigate = useNavigate();

const handleSubmit = async (e, courseId, cname, cweek, cdate) => {
  e.preventDefault();
  try {
    
    const formDataWithId = { ...formData, courseID: courseId,coursename: cname, coursewkd: cweek, date: cdate}; 



    const checkExistT = await axiosInstance.get('/api/tasks',{headers: { Authorization: `Bearer ${user.token}` },});
    const checkExistID = checkExistT.data.map(task => task.courseID);
    const checkExistC = await axiosInstance.get('/api/courses',{headers: { Authorization: `Bearer ${user.token}` },});

    const tasks = checkExistT.data;
    const courses = checkExistC.data;

    const courseIDInTasks = tasks.map(task => task.courseID);

    const courseWeekPairs = courses.map(course => ({
      courseID: course._id,
      cweek: course.cweek  
    }));
    const matchingWeeks = Array.from(new Set(courseWeekPairs.filter(pair => courseIDInTasks.includes(pair.courseID)).map(pair => pair.cweek)));
    
  


    
    if (checkExistID.includes(courseId)) {
      alert('Course already enrolled');
    } 
    else if (matchingWeeks.includes(cweek)){
       alert('Course with same week day found in your enrollment list');
       } 
      else{
        const response = await axiosInstance.post('/api/tasks', formDataWithId, {
        headers: { Authorization: `Bearer ${user.token}` },});
      }

    navigate('/tasks');

  } catch (error) {
    alert('Failed to save task.');
  }
};

return (
  <div>

<div className="mb-4">
  <label className="block mb-2 font-bold">Weekdays:</label>
  <div className="flex space-x-2">
    <button 
      onClick={() => setSelectedDay('')} 
      className={`p-2 rounded ${selectedDay === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      All
    </button>
    {weekList.map((day) => (
      <button 
        key={day} 
        onClick={() => setSelectedDay(day)} 
        className={`p-2 rounded ${selectedDay === day ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        {day}
      </button>
    ))}
  </div>
</div>
    




    {filteredCourses.map((course) => (
      <div key={course._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
        <h2 className="font-bold">{course.cname}</h2>
        <p>{course.cweek}</p>
        <p className="text-sm text-gray-500">Start Date: {new Date(course.cdate).toLocaleDateString()}</p>
        <strong>Course Description: </strong><span>{course.cdetail}</span>
        
        <form onSubmit={(e) => handleSubmit(e, course._id, course.cname, course.cweek, course.cdate)} >
          <input type="hidden" value='aaaaaaa' onChange={(e) => setInputValue(e.target.value)} />
          <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">{editingCourse ? 'Update Button' : 'Enroll'}</button>
        </form>

        <div className="mt-2"></div>
      </div>
    ))}
  </div>
);
};

export default CourseList;


