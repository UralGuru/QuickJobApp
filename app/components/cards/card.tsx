import { PaymentType } from '@/app/constatnts/enums';
import { FoundItemOrder } from '@/app/constatnts/types';
import { AntDesign, FontAwesome5, Fontisto } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 

const VacancyCard = (props: FoundItemOrder) => {
    const router = useRouter();
    
    return (
        <View style={styles.card}>
            <View style={styles.cardMain}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{props.title}</Text>
                    <Text style={styles.cardDescription}>{props.description}</Text>
                    <View style={styles.cardIcons}>
                        <View style={styles.icon}>
                        <Fontisto name="clock" size={20} color="black" />
                            <Text>{props.workHours} ч</Text>
                        </View>
                        <View style={styles.icon}>
                        <FontAwesome5 name="users" size={20} color="black" />
                            <Text>{props.approvedResponsesCount}/{props.limit} чел</Text>
                        </View>
                        <View style={styles.icon}>
                        <AntDesign name="creditcard" size={20} color="black" />
                            <Text>{props.paymentType == PaymentType.Card ? 'безналичными' : 'наличными'}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.cardPrice}>{props.price} руб/час</Text>
            </View>
            <Link
            href={`/order/${props.id}`}
                style={styles.cardButton}
            >
                <Text style={{ color: '#fff' }}>Подробнее</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        marginTop: 16,
    },
    cardMain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContent: {
        flex: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardDescription: {
        marginTop: 24,
        fontWeight: '300',
    },
    cardIcons: {
        flexDirection: 'row',
        marginTop: 24,
        fontWeight: '300',
        color: '#064bb3',
        gap: 12,
    },
    icon: {
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: '#002fa7',
        flex: 1,
        textAlign: 'right',
    },
    cardButton: {
        fontWeight: '500',
        backgroundColor: '#2664ff',
        color: '#fff',
        height: 32,
        lineHeight: 32,
        borderRadius: 4,
        marginTop: 12,
        textAlign: 'center'
    },
});

export default VacancyCard;
