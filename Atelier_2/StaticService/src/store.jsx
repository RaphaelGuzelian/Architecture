import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import selectedCardsReducer from './slices/selectedCardsSlice';
import enemyInfo from './slices/enemySlice';

export default configureStore({
    reducer: {
        userReducer: userReducer,
        selectedCardsReducer: selectedCardsReducer,
        enemyInfo: enemyInfo
      },
})
