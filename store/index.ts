import { configureStore } from "@reduxjs/toolkit";

import generalReducer from "./generalSlicer";
import { idsfindApi } from "./idsfindAPI";
import { glyphfindApi } from "./glyphfindAPI";
import { glyphDataApi } from "./glyphDataApi";

export const store= configureStore({
  reducer: {
    general: generalReducer,
    idsfindApi: idsfindApi.reducer,
    glyphfindApi: glyphfindApi.reducer,
    glyphDataApi: glyphDataApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(idsfindApi.middleware, glyphfindApi.middleware, glyphDataApi.middleware),
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
