import { taskState } from "../TaskData/TaskData";

  function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case "TOGGLE_FAVOURITE":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, isFavourite: !task.isFavourite }
          : task
      );
    case "DELETE_ALL_TASKS":
      return [];
    case "RESET_TASKS":
      return initialState;
    case "SEARCH_TASK":
      return state.filter((task) =>
        task.title.toLowerCase().includes(action.payload.toLowerCase())
      );

    default:
      return state;
  }
}

const initialState = taskState;
export { initialState , taskReducer };
