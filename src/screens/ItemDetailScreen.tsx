import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

export default function ItemDetailScreen({ route, navigation }: Props) {
    const { itemId } = route.params;
    const { categories } = useSelector((state: RootState) => state.menu);

    // Find the item in the categories
    const item = categories
        .flatMap((category) => category.menu_items)
        .find((item) => item.id === itemId);

    if (!item) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Item not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {item.image_url && (
                <Image source={{ uri: item.image_url }} style={styles.image} />
            )}

            <View style={styles.content}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>

                <Text style={styles.description}>{item.description}</Text>

                {item.allergens && item.allergens.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Allergens</Text>
                        <View style={styles.allergensList}>
                            {item.allergens.map((allergen, index) => (
                                <View key={index} style={styles.allergenTag}>
                                    <Text style={styles.allergenText}>{allergen}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {!item.is_available && (
                    <View style={styles.unavailableContainer}>
                        <Text style={styles.unavailableText}>
                            Currently Unavailable
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    allergensList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    allergenTag: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginRight: 8,
        marginBottom: 8,
    },
    allergenText: {
        fontSize: 14,
        color: '#666',
    },
    unavailableContainer: {
        backgroundColor: '#ffebee',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    unavailableText: {
        color: '#d32f2f',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
}); 