import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Supabase configuration
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase configuration. Please check your app.config.js');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUp = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
};

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { error: null };
    } catch (error: any) {
        return { error: error.message };
    }
};

export const getRestaurantByQR = async (qrCode: string) => {
    try {
        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('qr_code', qrCode)
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
};

export const getMenuCategories = async (restaurantId: string) => {
    try {
        const { data, error } = await supabase
            .from('menu_categories')
            .select('*')
            .eq('restaurant_id', restaurantId)
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
};

export const getMenuItems = async (categoryId: string) => {
    try {
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .eq('category_id', categoryId)
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
};

export const getFullMenu = async (restaurantId: string) => {
    try {
        const { data: categories, error: categoriesError } = await supabase
            .from('menu_categories')
            .select(`
        *,
        menu_items (*)
      `)
            .eq('restaurant_id', restaurantId)
            .order('sort_order', { ascending: true });

        if (categoriesError) throw categoriesError;
        return { data: categories, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
}; 