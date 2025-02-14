import { createSlice } from '@reduxjs/toolkit';

export const enemyInfo = createSlice({
  name: 'enemyInfo',
  // Define initial state of the reducer/slice
  initialState: {
    player2: {},
    cardList2: [],
  },
  // Define the reducers 
  reducers: {
    submit_enemy_action: (state, action) => {
      state.player2 = action.payload.player2;
      state.cardList2 = action.payload.cardList2;
    },
  },
});

// Action creators are generated for each case reducer function
export const { submit_enemy_action } = enemyInfo.actions;

export default enemyInfo.reducer;
