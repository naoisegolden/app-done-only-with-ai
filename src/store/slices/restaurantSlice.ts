import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Restaurant {
    id: string;
    name: string;
    description: string | null;
    logo_url: string | null;
    qr_code: string;
    created_at: string;
}

interface RestaurantState {
    currentRestaurant: Restaurant | null;
    loading: boolean;
    error: string | null;
}

const initialState: RestaurantState = {
    currentRestaurant: null,
    loading: false,
    error: null,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setRestaurant: (state, action: PayloadAction<Restaurant | null>) => {
            state.currentRestaurant = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearRestaurant: (state) => {
            state.currentRestaurant = null;
            state.error = null;
        },
    },
});

export const { setLoading, setRestaurant, setError, clearRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer; 