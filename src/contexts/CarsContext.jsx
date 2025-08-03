import React, { createContext, useContext, useReducer, useEffect } from "react";
import mockCars from "../data/mockCars"; // mock dữ liệu xe

// Action Types
export const ActionKind = {
  GetAllCars: "GET_ALL_CARS",
  GetOneCar: "GET_ONE_CAR",
  AddToCart: "ADD_TO_CART",
  Is_Favourite: "IS_FAVOURITE",
  Create_Car: "CREATE_CAR",
  Delete_Car: "DELETE_CAR",
  Add_to_Query: "ADD_TO_QUERY",
  Add_To_Search: "ADD_TO_SEARCH",
  Filter_Type_Query: "FILTER_TYPE_QUERY",
  Filter_Price_Query: "FILTER_PRICE_QUERY",
};

// Initial State
const initialState = {
  cars: [],
  searchItems: [],
  filterItems: [],
  query: "",
  filterType: [],
  filterPrice: 0,
};

// Context tạo
const CarsContext = createContext();
const { Provider } = CarsContext;

// Reducer logic
function carsReducer(state, action) {
  switch (action.type) {
    case ActionKind.GetAllCars:
      return { ...state, cars: action.payload };

    case ActionKind.Create_Car:
      return { ...state, cars: [...state.cars, action.payload] };

    case ActionKind.Delete_Car:
      return {
        ...state,
        cars: state.cars.filter((car) => car._id !== action.payload),
      };

    case ActionKind.Is_Favourite:
      return {
        ...state,
        cars: state.cars.map((car) =>
          car._id === action.payload
            ? { ...car, isFavourite: !car.isFavourite }
            : car
        ),
      };

    case ActionKind.Add_to_Query:
      return { ...state, query: action.payload };

    case ActionKind.Add_To_Search:
      return { ...state, searchItems: action.payload };

    case ActionKind.Filter_Type_Query:
      return { ...state, filterType: action.payload };

    case ActionKind.Filter_Price_Query:
      return { ...state, filterPrice: action.payload };

    default:
      return state;
  }
}

// Context Provider
function CarsContextProvider({ children }) {
  const [state, dispatch] = useReducer(carsReducer, initialState);

  useEffect(() => {
    dispatch({ type: ActionKind.GetAllCars, payload: mockCars });
  }, []);

  // Custom action functions
  const createCar = (car) => {
    dispatch({ type: ActionKind.Create_Car, payload: car });
  };

  const deleteCar = (id) => {
    dispatch({ type: ActionKind.Delete_Car, payload: id });
  };

  const toggleFavourite = (id) => {
    dispatch({ type: ActionKind.Is_Favourite, payload: id });
  };

  const addToQuery = (query) => {
    dispatch({ type: ActionKind.Add_to_Query, payload: query });
  };

  const addToSearch = (searchResults) => {
    dispatch({ type: ActionKind.Add_To_Search, payload: searchResults });
  };

  return (
    <Provider
      value={{
        ...state,
        dispatch,
        createCar,
        deleteCar,
        toggleFavourite,
        addToQuery,
        addToSearch,
      }}
    >
      {children}
    </Provider>
  );
}

// Custom hook
const useCarsContext = () => useContext(CarsContext);

export { CarsContextProvider as CarsProvider, useCarsContext, CarsContext };
