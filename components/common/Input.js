import { Text, View, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

function Input({
  placeholder,
  autoCorrect,
  autoCapitalize,
  name,
  errors,
  control,
  required,
  defaultValue,
}) {
  return (
    <View style={{ marginBottom: 30 }}>
      <Controller
        control={control}
        name={name}
        rules={required && { required: `${name} is required` }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={style.input}
            placeholder={placeholder}
            autoCorrect={autoCorrect}
            autoCapitalize={autoCapitalize}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            defaultValue={defaultValue}
          />
        )}
      />
      {errors[name] && (
        <Text style={{ color: "red" }}>{errors[name].message}</Text>
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

export default Input;
