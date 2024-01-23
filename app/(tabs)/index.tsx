import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import Listing from '../components/listing';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* <Link href={"/(modals)/login"}>Войти</Link> */}
      <Listing foundI={null} />
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
