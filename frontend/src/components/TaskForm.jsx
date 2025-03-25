import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useState, useEffect } from 'react';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ courseID: '', coursename: '', date: '' , cremark:''});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.courseID,
        coname: editingTask.coursename,
        cdate: editingTask.date,
        cremark: editingTask.remark,
      });
    } else {
      setFormData({ title: '', coname: '', cdate: '' , cremark: ''});
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      if (editingTask) {
        const response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData({ title: '', coname: '', cdate: '' , cremark: ''});
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  return (
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
        <h1 className="text-2xl font-bold mb-4">
          {editingTask ? formData.coname : 'Select a Course to add Remark'}
        </h1>
        
        <input
          type="text"
          placeholder="Remark"
          value={formData.cremark}
          onChange={(e) => setFormData({ ...formData, cremark: e.target.value })}
          className={`w-full mb-4 p-2 border rounded ${!editingTask ? 'bg-gray-200 cursor-not-allowed' : ''} ${!editingTask ? 'outline-none' : ''}`} // Add cursor style and remove outline
          readOnly={!editingTask} 
          style={{ cursor: !editingTask ? 'not-allowed' : 'auto' }} 
        />

        <button
          type="submit"
          className={`w-full p-2 rounded ${editingTask ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-700'}`}
          disabled={!editingTask} 
        >
          {editingTask ? 'Update Remark' : 'Update Remark'}
        </button>
      </form>
  );
};

export default TaskForm;
