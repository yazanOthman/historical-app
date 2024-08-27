const initialState = {
  places: [],
  currentPlace: null,
  loading: false,
  error: null,
  placesVisted: {},
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PLACES_REQUEST":
    case "FETCH_PLACE_DETAILS_REQUEST":
    case "FETCH_RANDOM_PLACES_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PLACES_SUCCESS":
      return { ...state, places: action.payload, loading: false };
    case "FETCH_PLACE_DETAILS_SUCCESS":
      return { ...state, currentPlace: action.payload, loading: false };
    case "FETCH_RANDOM_PLACES_SUCCESS":
      return { ...state, places: action.payload, loading: false };
    case "UPDATE_PLACE_VISITED":
      return { ...state, placesVisted: action.payload, loading: false };
    case "FETCH_PLACES_FAILURE":
    case "FETCH_PLACE_DETAILS_FAILURE":
    case "FETCH_RANDOM_PLACES_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default placesReducer;
