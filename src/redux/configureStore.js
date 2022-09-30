import {configureStore} from "@reduxjs/toolkit";
import cardSlice from './cardSlice'

const store = configureStore ({
  reducer: {
    cardsInfo: cardSlice
  }
})

export default store;