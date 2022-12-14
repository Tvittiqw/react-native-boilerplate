import apiClient from '../services/apiClient';

export const getMySchedules = async ({page, limit}) => {
  return apiClient.get('v1/schedule/usersSchedules', {params: {page, limit}});
};

export const getOtherSchedules = async ({page, limit}) => {
  return apiClient.get('v1/schedule', {params: {page, limit}});
};

export const createSchedule = async body => {
  return apiClient.post('v1/schedule', body);
};
