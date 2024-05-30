import { View, Text, TextInput, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { Controller } from "react-hook-form";

function InputConfirmPassword({
  placeholder,
  autoCorrect,
  autoCapitalize,
  name,
  control,
  errors,
  confirm,
}) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  return (
    <View style={{ marginBottom: 30 }}>
      <View>
        <Controller
          control={control}
          name={name}
          rules={{
            required: `This field is required`,
            validate: (val) => val == confirm || "Password do not match",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={style.input}
              placeholder={placeholder}
              autoCorrect={autoCorrect}
              autoCapitalize={autoCapitalize}
              secureTextEntry={passwordIsVisible ? false : true}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        <FontAwesome
          name={passwordIsVisible ? "eye-slash" : "eye"}
          size={25}
          style={{
            position: "absolute",
            top: "50%",
            right: "5%",
            transform: [{ translateY: -20 }],
          }}
          onPress={() => setPasswordIsVisible(!passwordIsVisible)}
        />
      </View>
      {errors[name] && (
        <Text style={{ color: "red" }}>{errors[name]?.message}</Text>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    borderColor: " #ececec",
    backgroundColor: "lightblue",
    borderWidth: 1,
    height: 50,
    paddingLeft: 20,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default InputConfirmPassword;
