import { configureStore } from "@reduxjs/toolkit";
import rootred from "./redux/reducers/main";

const store = configureStore({
  reducer: rootred
  // You can add other configuration options here
});

export default store;
