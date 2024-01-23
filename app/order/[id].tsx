import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AsyncButton } from '../components/ui/asyncButton';
import { getOrderItemThunk } from '../store/slices/orders.slice';
import { formatDateTime } from '../shared/regex';
import { PaymentType } from '../constatnts/enums';
import Contacts from '../components/cards/contacts';


const Page = ()=> {
  const {id} = useLocalSearchParams<{id: string}>();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const orderItem = useAppSelector(state => state.orders.item);
  const isCurrentUserCustomer = orderItem?.currentUserIsCustomer;

  const startDateTime = orderItem && formatDateTime(orderItem.startDateTime);
  const endDateTime = orderItem && formatDateTime(orderItem.endDateTime);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const renderResponseType = isCurrentUserCustomer ? (
    // <Responses responses={orderItem.responses} />
    null
) : (
    <Contacts />
);

  useEffect(()=>{
    dispatch(getOrderItemThunk(id))
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.main}>

        {orderItem && (
          <ScrollView  style={styles.mainCard}>
            <View style={styles.leftCard}>
              <Text style={styles.titleCard}>{orderItem?.title}</Text>

              <Text style={styles.price}>{orderItem?.price} руб/час</Text>

              <View style={styles.description}>
                <Text style={styles.heading}>Описание</Text>
                <Text>{orderItem?.description}</Text>

                <Text style={styles.heading}>Дата</Text>
                <Text>
                  с {startDateTime} по {endDateTime}
                </Text>

                <Text style={styles.heading}>Занятость</Text>
                <Text>~{orderItem?.workHours} ч</Text>

                <Text style={styles.heading}>Работников</Text>
                <Text>
                  {orderItem?.approvedResponsesCount}/{orderItem?.limit} чел
                </Text>

                <Text style={styles.heading}>Оплата</Text>
                <Text>
                  {orderItem?.paymentType === PaymentType.Card
                    ? 'безналичными'
                    : 'наличными'}
                </Text>
                
                <Text style={styles.heading}>Адрес</Text>
                <Text>{orderItem?.address}</Text>

              </View>
              <Text style={styles.date}>
                {orderItem && orderItem.editDateTime === null
                  ? formatDateTime(orderItem.createDateTime)
                  : 'изм. ' + formatDateTime(orderItem?.editDateTime || '')}
              </Text>
            </View>
            {renderResponseType}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  main: {
  },
  mainCard: {
    marginTop: 10,
    backgroundColor: '#e4ecff',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'column', 
  },
  leftCard: {
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 20,
    flex: 2,
  },
  titleCard: {
    fontSize: 20,
    fontWeight: '600',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#002fa7',
    marginTop: 16,
    marginBottom: 16
  },
  description: {
    // Add styles as needed
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 8
  },
  date: {
    marginTop: 8,
    fontSize: 14,
    color: 'gray',
    textAlign: 'right',
  },
  // Add other styles for the right card and other components
});

export default Page;