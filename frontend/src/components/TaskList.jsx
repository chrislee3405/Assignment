import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useEffect, useState } from 'react';

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert('Failed to delete task.');
    }
  };



  

  // Fetch the courses to get the weekday information
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/api/courses', {headers: { Authorization: `Bearer ${user.token}` },});
        setCourses(response.data); // Assuming the response contains an array of courses
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, [user.token]);

  const getWeekdayForTask = (task) => {
    const course = courses.find((course) => course._id === task.courseID);
    return course ? course.cweek : 'Unknown'; // Default to "Unknown" if no match is found
  };


  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{task.coursename}</h2>
          <p> {getWeekdayForTask(task)}</p>
          <p className="text-sm text-gray-500">Start Date: {new Date(task.date).toLocaleDateString()}</p>
          <div className="mt-2">
            {/* <button
              onClick={() => setEditingTask(task)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button> */}
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
