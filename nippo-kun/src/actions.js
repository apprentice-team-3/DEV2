export const SET_TODO = 'SET_TODO';

export const setTodo = (task) => ({
    type: SET_TODO,
    payload: task,
});
