import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuItem {
    id: string;
    category_id: string;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
    allergens: string[];
    is_available: boolean;
    sort_order: number | null;
}

interface MenuCategory {
    id: string;
    restaurant_id: string;
    name: string;
    description: string | null;
    sort_order: number | null;
    items: MenuItem[];
}

interface MenuState {
    categories: MenuCategory[];
    loading: boolean;
    error: string | null;
    selectedCategory: string | null;
    selectedItem: MenuItem | null;
}

const initialState: MenuState = {
    categories: [],
    loading: false,
    error: null,
    selectedCategory: null,
    selectedItem: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCategories: (state, action: PayloadAction<MenuCategory[]>) => {
            state.categories = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
        setSelectedItem: (state, action: PayloadAction<MenuItem | null>) => {
            state.selectedItem = action.payload;
        },
        clearMenu: (state) => {
            state.categories = [];
            state.selectedCategory = null;
            state.selectedItem = null;
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setCategories,
    setError,
    setSelectedCategory,
    setSelectedItem,
    clearMenu,
} = menuSlice.actions;
export default menuSlice.reducer; 