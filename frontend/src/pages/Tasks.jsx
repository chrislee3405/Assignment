import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import CourseList from '../components/CourseList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/api/tasks', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch tasks.123');
      }
    };


    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/api/courses', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCourses(response.data);
      } catch (error) {
        alert('Failed to fetch tasks.456');
      }
    };

    fetchCourses();


    fetchTasks();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <TaskForm
        tasks={tasks}
        setTasks={setTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <TaskList tasks={tasks} setTasks={setTasks} setEditingTask={setEditingTask} />
      <CourseList courses={courses} />
    </div>
  );
};

export default Tasks;
