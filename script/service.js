// todo-list crud
import { TODO_LIST_key, TODO_UPDATE_EVENT } from "./constant.js";
export const createTodo = (todo) => {
    // 로컬 스토리지에 저장된 데이터를 가져옴
    const strTodoList = localStorage.getItem(TODO_LIST_key);
    if (strTodoList === null)
        return; // === 엄격한 비교 strict comparison, == 느슨한 비교 losen comparison
    const todoList = JSON.parse(strTodoList);
    localStorage.setItem(TODO_LIST_key, JSON.stringify([todo, ...todoList]));
    window.dispatchEvent(new Event("todoUpdated"));
};
export const readTodoList = () => {
    const strTodoList = localStorage.getItem(TODO_LIST_key);
    if (strTodoList === null)
        return [];
    return JSON.parse(strTodoList);
};
export const updateTodo = (updatedTodo) => {
    const newTodoList = readTodoList().filter(todo => todo.id !== updatedTodo.id);
    localStorage.setItem(TODO_LIST_key, JSON.stringify([...newTodoList, updatedTodo]));
    window.dispatchEvent(new Event(TODO_UPDATE_EVENT));
};
export const deleteTodo = (todoId) => {
    const newTodoList = readTodoList().filter((todo) => todo.id !== todoId);
    localStorage.setItem(TODO_LIST_key, JSON.stringify(newTodoList));
    window.dispatchEvent(new Event(TODO_UPDATE_EVENT));
};
