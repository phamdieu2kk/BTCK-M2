// src/contexts/PickUpDropOffContext.jsx
import { createContext, useContext, useReducer } from "react";

// Define action types
const ActionTypes = {
  LOCATION_ONE: "LOCATION_ONE",
  LOCATION_TWO: "LOCATION_TWO",
  DATE_ONE: "DATE_ONE",
  DATE_TWO: "DATE_TWO",
  TIME_ONE: "TIME_ONE",
  TIME_TWO: "TIME_TWO",
};

// Initial state
const initialState = {
  location1: "Hồ Chí Minh",
  location2: "Hà Nội",
  date1: "2025-08-02",
  date2: "2025-08-05",
  time1: "08:00",
  time2: "17:00",
};

// Reducer
const pickUpDropOffReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOCATION_ONE:
      return { ...state, location1: action.payload };
    case ActionTypes.LOCATION_TWO:
      return { ...state, location2: action.payload };
    case ActionTypes.DATE_ONE:
      return { ...state, date1: action.payload };
    case ActionTypes.DATE_TWO:
      return { ...state, date2: action.payload };
    case ActionTypes.TIME_ONE:
      return { ...state, time1: action.payload };
    case ActionTypes.TIME_TWO:
      return { ...state, time2: action.payload };
    default:
      return state;
  }
};

// Create context
const PickUpDropOffContext = createContext();

// Provider component
export const PickUpDropOffProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pickUpDropOffReducer, initialState);

  // Action dispatchers
  const locationOneChange = (payload) =>
    dispatch({ type: ActionTypes.LOCATION_ONE, payload });
  const locationTwoChange = (payload) =>
    dispatch({ type: ActionTypes.LOCATION_TWO, payload });
  const dateOneChange = (payload) =>
    dispatch({ type: ActionTypes.DATE_ONE, payload });
  const dateTwoChange = (payload) =>
    dispatch({ type: ActionTypes.DATE_TWO, payload });
  const timeOneChange = (payload) =>
    dispatch({ type: ActionTypes.TIME_ONE, payload });
  const timeTwoChange = (payload) =>
    dispatch({ type: ActionTypes.TIME_TWO, payload });

  const contextValue = {
    state,
    locationOneChange,
    locationTwoChange,
    dateOneChange,
    dateTwoChange,
    timeOneChange,
    timeTwoChange,
  };

  return (
    <PickUpDropOffContext.Provider value={contextValue}>
      {children}
    </PickUpDropOffContext.Provider>
  );
};

// Custom hook
export const usePickUpDropOffContext = () =>
  useContext(PickUpDropOffContext);
