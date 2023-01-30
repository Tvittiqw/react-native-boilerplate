import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  postTodo,
  getTodos,
  patchTodo,
  deleteTodoRequest,
} from '../../requests/todo';
import {errorHandler} from '../../utils/helpers';

const initialState = {
  todos: [],
  errorMessage: null,
  isError: false,
  getTodosErrorMessage: null,
  getTodosIsError: false,
};

export const createTodo = createAsyncThunk(
  'todo/create',
  async (todo, thunkApi) => {
    try {
      const response = await postTodo(todo);
      return thunkApi.fulfillWithValue(response.data);
    } catch (err) {
      return thunkApi.rejectWithValue(errorHandler(err));
    }
  },
);

export const updateTodoAction = createAsyncThunk(
  'todo/update',
  async ({todo, newValue}, thunkApi) => {
    try {
      const body = {
        checked: newValue,
      };
      const response = await patchTodo(todo.id, body);
      return thunkApi.fulfillWithValue(response.data);
    } catch (err) {
      return thunkApi.rejectWithValue(errorHandler(err));
    }
  },
);

export const getTodosAction = createAsyncThunk(
  'todo/getTodos',
  async (args, thunkApi) => {
    try {
      const response = await getTodos();
      return thunkApi.fulfillWithValue(response?.data);
    } catch (err) {
      return thunkApi.rejectWithValue(errorHandler(err));
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todo/delete',
  async (id, thunkApi) => {
    try {
      const response = await deleteTodoRequest(id);
      return thunkApi.fulfillWithValue(id);
    } catch (err) {
      return thunkApi.rejectWithValue(errorHandler(err));
    }
  },
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: {
    [createTodo.fulfilled]: (state, {payload}) => {
      state.todos.unshift(payload);
    },
    [createTodo.rejected]: (state, {payload}) => {
      // state.errorMessage = payload.message;
      state.isError = true;
    },
    [getTodosAction.fulfilled]: (state, {payload}) => {
      state.todos = payload.reverse();
    },
    [getTodosAction.rejected]: (state, {payload}) => {
      // state.getTodosErrorMessage = payload;
      state.getTodosIsError = true;
    },
    [updateTodoAction.fulfilled]: (state, {payload}) => {
      const index = state.todos.findIndex(todo => todo.id === payload.id);
      if (index !== -1) {
        state.todos.splice(index, 1, payload);
      }
    },
    [updateTodoAction.rejected]: (state, {payload}) => {
      // state.getTodosErrorMessage = payload;
      state.updateTodosIsError = true;
    },
    [deleteTodo.fulfilled]: (state, {payload}) => {
      const index = state.todos.findIndex(todo => todo.id === payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
});

export default todoSlice.reducer;
