import React, {useEffect, useState} from 'react';
import * as apis from '../../apis';
import {roles} from "../../ultils/contants";
import moment from "moment";
import {InputField, Pagination} from "../../components";
import useDebounce from "../../hooks/useDebounce";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [payload, setPayload] = useState({
    q: "",
  })
  const fetchUsers = async (params) => {
    const response = await apis.apiGetAllUsers(params);
    console.log(response);
    if (response.success) {
      setUsers(response)
    }
  }

  const queriesDebounce = useDebounce(payload.q, 500)

  useEffect(() => {
    const params = {};
    if (queriesDebounce) {
      params.q = queriesDebounce;
    }
    fetchUsers(params)
  }, [queriesDebounce]);

  return (
    <div>
      <div className="w-full p-4 border-b border-gray-300">
        <span className="font-semibold text-4xl text-grayDark">
          Manage Users
        </span>
      </div>
      <div className="flex justify-end p-4">
        <InputField
          type="text"
          nameKey="q"
          value={payload.q}
          setValue={setPayload}
          placeholder="Search name user, email, phone"
          isHideLabel
        />
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
              <td className="px-6 py-4 flex items-center gap-3">
                <span className="hover:text-primary underline cursor-pointer">
                  Edit
                </span>
                <span className="hover:text-primary underline cursor-pointer">
                  Delete
                </span>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <div className="w-full p-4">
        <Pagination totalCount={users?.counts} />
      </div>
    </div>
  );
};

export default ManageUsers;
