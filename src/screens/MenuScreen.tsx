import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ListRenderItem,
} from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCategories, setSelectedCategory } from '../store/slices/menuSlice';
import { getFullMenu } from '../services/supabase';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import type { MenuCategory, MenuItem } from '../store/slices/menuSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

export default function MenuScreen({ route, navigation }: Props) {
    const { restaurantId } = route.params;
    const dispatch = useDispatch();
    const { currentRestaurant } = useSelector((state: RootState) => state.restaurant);
    const { categories, selectedCategory, loading } = useSelector(
        (state: RootState) => state.menu
    );

    useEffect(() => {
        loadMenu();
    }, [restaurantId]);

    useEffect(() => {
        if (currentRestaurant) {
            navigation.setOptions({
                title: currentRestaurant.name,
            });
        }
    }, [currentRestaurant]);

    const loadMenu = async () => {
        try {
            const { data, error } = await getFullMenu(restaurantId);
            if (error) throw error;
            dispatch(setCategories(data || []));
            if (data && data.length > 0) {
                dispatch(setSelectedCategory(data[0].id));
            }
        } catch (error) {
            alert('Error loading menu');
        }
    };

    const renderCategory: ListRenderItem<MenuCategory> = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.selectedCategory,
            ]}
            onPress={() => dispatch(setSelectedCategory(item.id))}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === item.id && styles.selectedCategoryText,
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderMenuItem: ListRenderItem<MenuItem> = ({ item }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })}
        >
            {item.image_url && (
                <Image source={{ uri: item.image_url }} style={styles.itemImage} />
            )}
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                </Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    const selectedCategoryItems = categories.find(
        (cat) => cat.id === selectedCategory
    )?.menu_items;

    return (
        <View style={styles.container}>
            <FlatList<MenuCategory>
                horizontal
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                style={styles.categoriesList}
                showsHorizontalScrollIndicator={false}
            />
            <FlatList<MenuItem>
                data={selectedCategoryItems}
                renderItem={renderMenuItem}
                keyExtractor={(item) => item.id}
                style={styles.menuList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    } as ViewStyle,
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    categoriesList: {
        backgroundColor: '#fff',
        paddingVertical: 10,
    } as ViewStyle,
    categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    } as ViewStyle,
    selectedCategory: {
        backgroundColor: '#007AFF',
    } as ViewStyle,
    categoryText: {
        fontSize: 16,
        color: '#333',
    } as TextStyle,
    selectedCategoryText: {
        color: '#fff',
    } as TextStyle,
    menuList: {
        flex: 1,
        padding: 10,
    } as ViewStyle,
    menuItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
    } as ViewStyle,
    itemImage: {
        width: 100,
        height: 100,
    } as ImageStyle,
    itemInfo: {
        flex: 1,
        padding: 10,
    } as ViewStyle,
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    } as TextStyle,
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    } as TextStyle,
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    } as TextStyle,
}); 