import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import VacancyCard from './cards/card';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { getOrdersThunk } from '../store/slices/orders.slice';
import { FrontObject } from '../constatnts/types';

// import { getOrdersThunk } from './store/slices/orders.slice';
// import { useAppDispatch, useAppSelector } from './shared/hooks';

const Listing = ({foundI}: {foundI: FrontObject | null}) => {
    const dispatch = useAppDispatch();
    const foundItems = useAppSelector(state => state.orders.foundItems);
    // const navigation = useNavigation(); // Замените useNavigate на useNavigation

    useEffect(() => {
        dispatch(getOrdersThunk());
    }, []);

    return (
        <View style={styles.container}>
            
                {
                    foundI ? 
                    <FlatList 
                        data={foundI.foundItems}
                        renderItem={({item})=><VacancyCard {...item} key={item.id} />} />
                        :
                        <FlatList 
                        data={foundItems}
                        renderItem={({item})=><VacancyCard {...item} key={item.id} />} />
                }
                
            
            
                
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4ecff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Listing;
