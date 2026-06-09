import { useEffect, useState } from "react";
import api from "../api/axios";

import Navbar from "../components/Navbar";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/contacts");
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editingUser) {
        await api.put(`/contacts/${editingUser._id}`, formData);
        alert("User Updated Successfully");
      } else {
        await api.post("/contacts", formData);
        alert("User Added Successfully");
      }

      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/contacts/${id}`);
      fetchUsers();
      alert("User Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        Contacts List
                      </h2>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Total {users.length}{" "}
                        {users.length === 1 ? "contact" : "contacts"}
                      </p>
                    </div>
                    <div className="p-2 bg-gray-200 rounded-lg">
                      <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <UserTable
                  users={users}
                  onEdit={setEditingUser}
                  onDelete={handleDelete}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-1.5 bg-gray-800 rounded-lg">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          editingUser
                            ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        }
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingUser ? "Edit Contact" : "Add New Contact"}
                  </h2>
                </div>

                <UserForm
                  onSubmit={handleSubmit}
                  editingUser={editingUser}
                  setEditingUser={setEditingUser}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
