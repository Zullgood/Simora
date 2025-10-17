import api from './api';

export const superAdminAPI = {
  getAll: () => api.get('/super-admins'),
  create: (data) => api.post('/super-admins', data),
  update: (id, data) => api.put(`/super-admins/${id}`, data),
  delete: (id) => api.delete(`/super-admins/${id}`),
};

export default superAdminAPI;