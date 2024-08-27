import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import PlacesList from "./components/PlacesList";
import PlaceDetails from "./components/PlaceDetails";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<PlacesList />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
      </Routes>
    </Provider>
  );
}

export default App;
