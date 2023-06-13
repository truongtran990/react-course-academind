import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  totalQuantity: 0,
  items: [],
  totalPrice: 0,
  isShowCart: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    toggleCart(state) {
      state.isShowCart = !state.isShowCart;
    },
    addToCart(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      state.totalQuantity += 1;

      if (itemIndex < 0) {
        state.items.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
        return;
      }
      const newQuantity = state.items[itemIndex].quantity + 1;

      state.items[itemIndex] = {
        ...action.payload,
        quantity: newQuantity,
        total: action.payload.price * newQuantity,
      };
    },
    increaseQuantity(state, action) {
      const existItem = state.items.find(
        (item) => action.payload.id === item.id
      );
      state.totalQuantity += 1;
      existItem.total += existItem.price;
      existItem.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const existItem = state.items.find(
        (item) => action.payload.id === item.id
      );
      state.totalQuantity -= 1;
      if (existItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== existItem.id);
      } else {
        existItem.quantity -= 1;
        existItem.total -= existItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

const store = configureStore({ reducer: { cart: cartSlice.reducer } });

export default store;