import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchRandomUserInfo = createAsyncThunk("cards/fetchRandomUserInfo", async () => {
//   let response = await fetch("https://randomuser.me/api/");
//   let data = await response.json();
//   return data.results[0].name;
// });




export const fetchRandomUserInfo = createAsyncThunk("cards/fetchRandomUserInfo", async () => {
  return fetch("https://randomuser.me/api/")
  .then((response) => response.json())
  .then((data) => data.results[0].name);
});

const cardSlice = createSlice({
	name:'card',
	initialState: {
		user: {
			first: null,
			last: null
		},
		cards: [
		{
			cardNumber: "5561441333332222".match(/.{1,4}/g).join(" "),
			vendor:'visa',
			month: "12",
			year:'24',
			ccv: "666",
			isActive: true
		}

		]
	},
	reducers:{
		addCard: (state, { payload }) => {
			state.cards.push(payload)
		},
		deleteCard:(state,{ payload }) => {
			state.cards = state.cards.filter(({cardNumber})=> cardNumber !== payload.cardNumber)
		},
		activateCard:(state, { payload }) => {
      state.cards
        .find(({ isActive }) => isActive)
        .isActive = false;

      state.cards
        .find(({ cardNumber }) => cardNumber === payload.cardNumber)
        .isActive = true;
    }
  },
	extraReducers: {
		[fetchRandomUserInfo.pending]: (state, action) => {
			//console.log("fetching data");
			state.status = "Fetching data"
		},
		[fetchRandomUserInfo.fulfilled]:(state, action) =>{
			state.status = "Success";
			state.user.first = action.payload.first.toUpperCase();
			state.user.last = action.payload.last.toUpperCase();
		},
		[fetchRandomUserInfo.rejected]:(state, action) =>{
			//console.log("Failed to fetch data");
			state.status = "Failed to fetch data"
		}
	}
})
export const {addCard, deleteCard, activateCard} = cardSlice.actions;
export default cardSlice.reducer;
