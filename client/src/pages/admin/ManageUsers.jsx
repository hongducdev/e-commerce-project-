import React, {useEffect, useState} from 'react';
import * as apis from '../../apis';
import moment from "moment";
import {InputField, InputForm, Pagination, Select} from "../../components";
import useDebounce from "../../hooks/useDebounce";
import {useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {blockStatus, roles} from "../../ultils/contants";

const ManageUsers = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    role: "",
    status: "",
  })
  const [users, setUsers] = useState([]);
  const [params] = useSearchParams();
  const [payload, setPayload] = useState({
    q: "",
  })
  const [editUser, setEditUser] = useState(null)
  const fetchUsers = async (params) => {
    const response = await apis.apiGetAllUsers(
      {
        ...params,
        limit: process.env.REACT_APP_PRODUCT_LIMIT || 10,
      }
    );
    if (response.success) {
      setUsers(response)
    }
  }

  const queriesDebounce = useDebounce(payload.q, 500)

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if (queriesDebounce) payload.q = queriesDebounce
    fetchUsers(queries)
  }, [queriesDebounce]);

  const handleEditUser = async (data) => {
    const response = await apis.apiUpdateUser(data, editUser._id)

    if (response.success) {
      toast.success(response.message)
      setEditUser(null)
      fetchUsers()
    } else {
      toast.error(response.message)
    }
  }

  const handleDeleteUser = async (uid) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apis.apiDeleteUser(uid)
        if (response.success) {
          toast.success(response.message)
          fetchUsers()
        } else {
          toast.error(response.message)
        }
      }
    })
  }

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
        <form onSubmit={handleSubmit(handleEditUser)}>
          <table className="w-full text-sm text-left text-gray-500 table-auto">
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users?.users?.map((user, index) => (
              <tr key={user._id} className={`${(index + 1) % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{
                  editUser?._id === user._id ? (<InputForm
                    register={register}
                    fullWidth
                    errors={errors}
                    id="firstName"
                    placeholder="First name"
                    defaultValue={editUser.firstName}
                    validate={{
                      required: "First name is required",

                    }}
                  />) : (<span>{user.firstName}</span>)
                }</td>
                <td className="p-3">{
                  editUser?._id === user._id ? (<InputForm
                    register={register}
                    errors={errors}
                    id="lastName"
                    fullWidth
                    placeholder="Last name"
                    defaultValue={editUser.lastName}
                    validate={{
                      required: "Last name is required",

                    }}
                  />) : (<span>{user.lastName}</span>)
                }</td>
                <td className="p-3">{
                  editUser?._id === user._id ? (<InputForm
                    register={register}
                    type="email"
                    errors={errors}
                    id="email"
                    fullWidth
                    placeholder="Email"
                    defaultValue={editUser.email}
                    validate={{
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email is invalid",
                      }
                    }}
                  />) : (<span>{user.email}</span>)
                }</td>
                <td className="p-3">{
                  editUser?._id === user._id ? (<InputForm
                    register={register}
                    errors={errors}
                    id="mobile"
                    fullWidth
                    placeholder="Mobile"
                    defaultValue={editUser.mobile}
                    validate={{
                      required: "Mobile is required",
                      pattern: {
                        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                        message: "Mobile is invalid",
                      }
                    }}
                  />) : (<span>{user.mobile}</span>)
                }</td>
                <td className="p-3">{
                  editUser?._id === user._id ? (
                    <Select
                      register={register}
                      errors={errors}
                      defaultValue={editUser.role}
                      id="role"
                      fullWidth
                      options={roles}
                      validate={{
                        required: "Role is required",
                      }}
                    />
                  ) : (<span>{roles.find(role => role.code === user.role)?.value}</span>)
                }</td>
                <td className="p-3">{moment(user.createdAt).format("DD/MM/YYYY")}</td>
                <td className="p-3">{
                  editUser?._id === user._id ? (
                    <Select
                      register={register}
                      errors={errors}
                      defaultValue={editUser.isBlocked}
                      id="isBlocked"
                      fullWidth
                      options={blockStatus}
                      validate={{
                        required: "Status is required",
                      }}
                    />
                  ) : (
                    <span>{user.isBlocked ? "Blocked" : "Active"}</span>
                  )
                }</td>
                <td className="p-3 flex items-center gap-3">
                  {
                    editUser?._id === user._id ? (
                      <>
                        <button type="submit" className="hover:text-primary underline cursor-pointer">
                          Save
                        </button>
                        <span className="hover:text-primary underline cursor-pointer" onClick={() => setEditUser(null)}>
                          Cancel
                        </span>
                      </>
                    ) : (
                      <>
                      <span className="hover:text-primary underline cursor-pointer" onClick={() => setEditUser(user)}>
                        Edit
                      </span>
                        <span className="hover:text-primary underline cursor-pointer" onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </span>
                      </>
                    )
                  }
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </form>
      </div>

      <div className="w-full p-4">
        <Pagination totalCount={users?.counts}/>
      </div>
    </div>
  );
};

export default ManageUsers;
