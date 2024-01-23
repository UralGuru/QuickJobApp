import { Text, View, TextInput, Button, StyleSheet } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { useFocusEffect, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { loginThunk, setIsLogin } from "../store/slices/auth.slice";
import { useEffect } from "react";
import React from "react";

interface LoginAuth {
  email: string;
  password: string;
}

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAuth>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state=>state.auth.isAuth)

  const onSubmit = (data: LoginAuth) => {
    // dispatch(loginThunk(data))
    dispatch(setIsLogin( true))
    router.replace("/")
  }

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if(isAuth){
  //       router.replace('/')
  //      }
  //   }, [isAuth])
  // );

  // useEffect(() => {
  //   if(isAuth){
  //      router.replace('/(modals)/login')
  //     };
  // }, [isAuth]);


  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Почта"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.errorText}>This is required.</Text>}
  
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.errorText}>This is required.</Text>}
  
      <Button style={styles.button} title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
