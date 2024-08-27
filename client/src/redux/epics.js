import { ofType } from "redux-observable";
import { mergeMap, map, catchError, withLatestFrom } from "rxjs/operators";
import { from, of } from "rxjs";

import axios from "axios";

const API_URL = "http://localhost:5001/api/v1";
axios.defaults.withCredentials = true;

export const fetchPlacesEpic = (action$) =>
  action$.pipe(
    ofType("FETCH_PLACES_REQUEST"),
    mergeMap(() =>
      from(axios.get(`${API_URL}/places`)).pipe(
        map((response) => ({
          type: "FETCH_PLACES_SUCCESS",
          payload: response.data,
        })),
        catchError((error) =>
          of({ type: "FETCH_PLACES_FAILURE", payload: error.message })
        )
      )
    )
  );

export const updatePlace = (action$, state$) => {
  return action$.pipe(
    ofType("UPDATE_PLACE_VISITED"),
    withLatestFrom(state$), // Combine the action stream with the latest state
    mergeMap(([action, state]) => {
      const { placesVisted } = state?.places;
      return from(
        axios.patch(`${API_URL}/places/${placesVisted.id}`, {
          visited: placesVisted.visited,
        })
      ).pipe(
        map((response) => ({
          type: "UPDATE_PLACE_VISIT_SUCCESS",
          payload: response.data,
        })),
        catchError((error) => of({ type: "", payload: error.message }))
      );
    })
  );
};

export const fetchPlaceDetailsEpic = (action$) =>
  action$.pipe(
    ofType("FETCH_PLACE_DETAILS_REQUEST"),
    mergeMap((action) =>
      from(axios.get(`${API_URL}/places/${action.payload}`)).pipe(
        map((response) => ({
          type: "FETCH_PLACE_DETAILS_SUCCESS",
          payload: response.data.place,
        })),
        catchError((error) =>
          of({ type: "FETCH_PLACE_DETAILS_FAILURE", payload: error.message })
        )
      )
    )
  );

export const fetchRandomPlacesEpic = (action$) =>
  action$.pipe(
    ofType("FETCH_RANDOM_PLACES_REQUEST"),
    mergeMap(() =>
      from(axios.get(`${API_URL}/random-places`)).pipe(
        map((response) => ({
          type: "FETCH_RANDOM_PLACES_SUCCESS",
          payload: response.data,
        })),
        catchError((error) =>
          of({ type: "FETCH_RANDOM_PLACES_FAILURE", payload: error.message })
        )
      )
    )
  );
