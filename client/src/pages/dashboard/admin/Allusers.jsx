import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../../hooks/useAuth';

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
      confirmButtonColor: '#e11d48',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.map(user => user._id === id ? { ...user, status: newStatus } : user));
        Swal.fire('Success!', `User has been ${newStatus}`, 'success');
      }
    });
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
    Swal.fire('Success!', `Role changed to ${newRole}`, 'success');
  };

  const filteredUsers = filter === 'all' ? users : users.filter(user => user.status === filter);

  if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-error"></span></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-base-content">All Registered Users</h2>

      {/* Filter Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1 w-fit">
        {['all', 'active', 'blocked'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`tab capitalize ${filter === status ? 'tab-active bg-error text-white' : ''}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                    </div>
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </td>
                <td className="text-base-content/70">{user.email}</td>
                <td>
                  <span className="badge badge-info badge-soft capitalize font-medium">
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'} badge-soft`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleBlockUnblock(user._id, user.status)}
                      className={`btn btn-sm ${user.status === 'active' ? 'btn-error' : 'btn-success'} text-white`}
                    >
                      {user.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                    <div className="dropdown dropdown-left">
                      <button tabIndex={0} className="btn btn-sm btn-outline">Change Role</button>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 border border-base-200">
                        <li><button onClick={() => handleRoleChange(user._id, 'donor')}>Donor</button></li>
                        <li><button onClick={() => handleRoleChange(user._id, 'volunteer')}>Volunteer</button></li>
                        <li><button onClick={() => handleRoleChange(user._id, 'admin')}>Admin</button></li>
                      </ul>
                    </div>
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