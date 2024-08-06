import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./MusicPlayer/musicplayer.slice";
const store = configureStore({ reducer: { musicplayer: musicPlayerReducer } });

export default store;
