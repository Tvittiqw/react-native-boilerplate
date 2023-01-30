import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Text, View, FlatList, Dimensions} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import TodosForm from './TodosForm';
import styles from './styles';
import todoValidationSchema from '../../validators/todoValidationSchema';
import {useDispatch, useSelector} from 'react-redux';
import {
  createTodo,
  getTodosAction,
  updateTodoAction,
  deleteTodo,
} from '../../redux/todo/todoSlice';
import ListItem from './ListItem';

const TodosComponent = props => {
  const [validateOnChange, setValidateOnChange] = useState(false);
  const {todos, errorMessage, isError} = useSelector(state => state?.todo);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(getTodosAction());
  }, []);

  const submitTodoForm = async (formValues, action) => {
    action.setSubmitting(true);
    await dispatch(createTodo(formValues));
    action.setSubmitting(false);
    action.resetForm({todo: ''});
  };

  const onChangeTodo = (todo, newValue) => {
    dispatch(updateTodoAction({todo, newValue}));
  };

  const handleDelete = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <SafeAreaView style={styles.todosWrapper}>
      <Text style={styles.header}>{'Today task'}</Text>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        style={styles.todosList}
        renderItem={({item}) => (
          <ListItem
            simultaneousHandlers={scrollRef}
            onChangeTodo={onChangeTodo}
            key={item.index}
            item={item}
            onDismiss={handleDelete}
          />
        )}
      />
      <TodosForm
        initialValues={{text: ''}}
        validationSchema={todoValidationSchema}
        onSubmit={submitTodoForm}
        validateOnChange={validateOnChange}
        // setValidateOnChange={setValidateOnChange}
        isError={isError}
        errorMessage
      />
    </SafeAreaView>
  );
};

export default TodosComponent;
