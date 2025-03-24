import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const { user } = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    stuNu: '',
    university: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if (!user) {
      navigate('/');
      return;
    }

    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          stuNu: response.data.stuNu || '',
          university: response.data.university || '',
          address: response.data.address || '',
        });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
<form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
  <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
  
  <table className="w-full">
    <tbody>
      <tr>
        <td className="p-2"><label>Name:</label></td>
        <td className="p-2">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </td>
      </tr>
      <tr>
        <td className="p-2"><label>Student Number:</label></td>
        <td className="p-2">
          <input
            type="text"
            value={formData.stuNu}
            onChange={(e) => 
              setFormData({ ...formData, stuNu: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </td>
      </tr>
      <tr>
        <td className="p-2"><label>Email:</label></td>
        <td className="p-2">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </td>
      </tr>
      <tr>
        <td className="p-2"><label>University:</label></td>
        <td className="p-2">
          <input
            type="text"
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </td>
      </tr>
      <tr>
        <td className="p-2"><label>Address:</label></td>
        <td className="p-2">
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-4">
    {loading ? 'Updating...' : 'Update Profile'}
  </button>
</form>
    </div>
  );
};

export default Profile;
