import * as Yup from 'yup';
import {commonValues} from './commonValues';

const {scheduleName, scheduleDescription} = commonValues;

export const createScheduleValidationSchema = Yup.object({
  name: scheduleName,
  description: scheduleDescription,
});
