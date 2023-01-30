import apiClient from '../services/apiClient';

export const postTodo = body => {
  console.log('body', body);
  return apiClient.post('v1/todo', body);
};

export const getTodos = () => {
  return apiClient.get('v1/todo');
};

export const patchTodo = (id, body) => {
  return apiClient.patch(`v1/todo/${id}`, body);
};

export const deleteTodoRequest = id => {
  return apiClient.delete(`v1/todo/${id}`);
};
