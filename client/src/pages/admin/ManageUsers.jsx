import React, {useEffect, useState} from 'react';
import * as apis from '../../apis';
import {roles} from "../../ultils/contants";
import moment from "moment";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async (params) => {
    const response = await apis.apiGetAllUsers(params);
    console.log(response);
    if (response.success) {
      setUsers(response)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div>
      <div className="w-full p-4 border-b border-gray-300">
        <span className="font-semibold text-4xl text-grayDark">
          Manage Users
        </span>
      </div>
      <div className="relative overflow-x-auto p-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Full Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Phone</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3">Created</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
          </thead>
          <tbody>
          {users?.users?.map((user, index) => (
            <tr key={user._id} className={`${(index + 1) % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}>
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{user.firstName + " " + user.lastName}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.mobile}</td>
              <td className="px-6 py-4">{roles.find(role => role.code === user.role)?.value}</td>
              <td className="px-6 py-4">{moment(user.createdAt).format("DD/MM/YYYY")}</td>
              <td className="px-6 py-4">{user.isBlocked ? "Blocked" : "Active"}</td>
              <td className="px-6 py-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
