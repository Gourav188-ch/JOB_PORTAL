import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import companyReducer from "./companyslice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import companySlice from "./companyslice";

// import storage from "redux-persist/lib/storage";

// console.log("Storage:", storage);
import storageModule from "redux-persist/lib/storage";
import applicationSlice from "./applicationSlice";

// console.log(storageModule.default);

const persistConfig = {
    key: "root",
    storage: storageModule.default,
    whitelist: ["auth"],
};

// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["auth"],
// };

const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
    company: companySlice,
    company: companyReducer,
    application: applicationSlice,
});

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);



// import { configureStore } from "@reduxjs/toolkit";
// import { authSliceReducer } from "./authSlice";
// import jobSlice from "./jobSlice";

// const store = configureStore({
//     reducer: {
//         auth: authSliceReducer,
//         job: jobSlice,
//     }
// })

// export default store;
