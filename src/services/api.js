import Apiclient from "./apiClient";

export const apiclient = {
  getDepartments: async () => {
    const res = await Apiclient.get(`/departments`);
    return res.data;
  },
  createDepartment: async (department) => {
    const res = await Apiclient.post(`/departments`, department);
    return res.data;
  },
  updateDepartment: async (id, department) => {
    const res = await Apiclient.put(`${`/departments`}/${id}`, department);
    return res.data;
  },
  deleteDepartment: async (id) => {
    await Apiclient.delete(`${`/departments`}/${id}`);
    return true;
  },
};