import { createStore, applyMiddleware, combineReducers } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import placesReducer from "./placesReducer";
import {
  fetchPlacesEpic,
  fetchPlaceDetailsEpic,
  fetchRandomPlacesEpic,
  updatePlace,
} from "./epics";

const rootEpic = combineEpics(
  fetchPlacesEpic,
  fetchPlaceDetailsEpic,
  fetchRandomPlacesEpic,
  updatePlace
);

const rootReducer = combineReducers({
  places: placesReducer,
});

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
