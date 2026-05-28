import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../../context/AuthContext';

const AllUsers = () => {
  const { token } = useAuth(); 
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Mock data
        const mockUsers = [
          { _id: 1, name: "Rahim Khan", email: "rahim@gmail.com", role: "donor", status: "active", avatar: "https://i.pravatar.cc/150?u=1" },
          { _id: 2, name: "Fatima Begum", email: "fatima@gmail.com", role: "donor", status: "blocked", avatar: "https://i.pravatar.cc/150?u=2" },
          { _id: 3, name: "Karim Ahmed", email: "karim@gmail.com", role: "volunteer", status: "active", avatar: "https://i.pravatar.cc/150?u=3" },
        ];
        setUsers(mockUsers);
      } catch (error) {
        console.error("Error loading users:", error);
        Swal.fire('Error', 'Failed to load users', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]); 

  const handleBlockUnblock = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    
    Swal.fire({
      title: `${newStatus === 'blocked' ? 'Block' : 'Unblock'} User?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.map(user => 
          user._id === id ? { ...user, status: newStatus } : user
        ));
        Swal.fire('Success!', `User has been ${newStatus}`, 'success');
      }
    });
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user => 
      user._id === id ? { ...user, role: newRole } : user
    ));
    Swal.fire('Success!', `Role changed to ${newRole}`, 'success');
  };

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.status === filter);

  if (loading) return <div className="text-center py-20 text-xl">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">All Users</h2>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3">
        {['all', 'active', 'blocked'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-xl font-medium transition ${
              filter === status ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="capitalize px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() => handleBlockUnblock(user._id, user.status)}
                      className={`px-4 py-1 text-xs rounded-lg ${
                        user.status === 'active' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                      }`}
                    >
                      {user.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                    <button
                      onClick={() => handleRoleChange(user._id, 'volunteer')}
                      className="px-4 py-1 text-xs bg-blue-600 text-white rounded-lg"
                    >
                      Make Volunteer
                    </button>
                    <button
                      onClick={() => handleRoleChange(user._id, 'admin')}
                      className="px-4 py-1 text-xs bg-purple-600 text-white rounded-lg"
                    >
                      Make Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;