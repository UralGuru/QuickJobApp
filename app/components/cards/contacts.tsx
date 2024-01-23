import { useAppDispatch, useAppSelector } from '@/app/shared/hooks';
import { getUserThunk } from '@/app/store/slices/orders.slice';
import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';


const Contacts = () => {
  const dispatch = useAppDispatch();
  const customerInfo = useAppSelector(state => state.orders.item?.customerInfo);
  const orderItem = useAppSelector(state => state.orders.item);
  const [isOpenAuthPopup, setOpenAuthPopup] = useState(false);
  const [isApproved, setIsApproved] = useState(orderItem?.responseStatus === 'Approved');

  useEffect(() => {
    orderItem?.customerId !== undefined && dispatch(getUserThunk(orderItem.customerId));
  }, [orderItem?.customerId]);

  const dispatchResponse = () => {
    console.log("Запрос");
    // if (isAuth && !isApproved) {
    //   orderItem && dispatch(orderResponseFromUserThunk(orderItem.id));
    //   setIsApproved(true);
    // } else if (isAuth && isApproved) {
    //   orderItem && dispatch(deleteOrderResponseFromUserThunk(orderItem.id));
    //   id && dispatch(getOrderItemThunk(id));
    //   setIsApproved(false);
    // } else {
    //   setOpenAuthPopup(true);
    // }
  };
  const dialCall = (number:string) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.rightCard}>
      <View style={styles.employerCard}>
        <View style={styles.employerAvatarName}>
          <View style={styles.employerAvatar} />
          <Text style={styles.employerName}>{customerInfo?.fio}</Text>
        </View>
        <View style={styles.employerContacts}>
          {customerInfo?.phone && (
            <TouchableOpacity style={styles.contact} onPress={()=>dialCall(customerInfo.phone)}>
              <View style={styles.contactIcon}>
                <Feather name="phone" size={24} color="black" />
              </View>
              <Text>{customerInfo.phone}</Text>
            </TouchableOpacity>
          )}
          {customerInfo?.email && (
            <View style={styles.contact}>
              <View style={styles.contactIcon}>
                <Entypo name="email" size={24} color="black" />
              </View>
              <Text selectable={true}>{customerInfo.email}</Text>
            </View>
          )}
          {customerInfo?.telegram?.tgUsername && (
            <View style={styles.contact}>
              <View style={styles.contactIcon}>
                <FontAwesome5 name="telegram-plane" size={24} color="black" />
              </View>
              <Text>{customerInfo.telegram.tgUsername}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={dispatchResponse}
        >
          <Text style={styles.buttonText}>
            {isApproved ? 'Отказаться' : 'Откликнуться'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
)};

const styles = StyleSheet.create({
  rightCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 8
  },
  employerCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize: 16,
    padding: 20,
  },
  employerAvatarName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  employerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d9d9d9',
  },
  employerName: {
    fontWeight: '600',
    fontSize: 16,
  },
  employerContacts: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8,
  },
  contact: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  contactIcon: {
    color: '#002fa7',
    fontSize: 22,
    marginRight: 8
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    borderWidth: 1,
    borderColor: '#2664ff',
    borderRadius: 4,
    backgroundColor: '#2664ff',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Contacts;
