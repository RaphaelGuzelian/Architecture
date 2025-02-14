import { createSlice } from '@reduxjs/toolkit'

export const selectedCardsSlice = createSlice({
  name: 'Cards',
  // Define initial state of the reducer/slice
  initialState: {
    submitted_cards:{},
  },
  // Define the reducers 
  reducers: {
    submit_selected_cards: (state, action) => {
        state.submitted_cards = action.payload.cards
    },
}
})

// Action creators are generated for each case reducer function
export const { submit_selected_cards } = selectedCardsSlice.actions

export default selectedCardsSlice.reducer
