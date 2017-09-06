import React from 'react';
import { Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker';

const InputDate = ({ label, date, onDateChange, placeholder }) => {
  const { inputContainerStyle, inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <DatePicker
        mode="date"
        placeholder={placeholder}
        format="DD-MM-YYYY"
        style={inputContainerStyle}
        customStyles={inputStyle}
        date={date}
        onDateChange={onDateChange}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
      />
    </View>
  );
};

const styles = {
  inputContainerStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    flex: 2
  },
  inputStyle: {
    dateInput: {
      alignItems: 'flex-start',
      borderWidth: 0
    },
    dateText: {
      fontSize: 16,
      lineHeight: 21
    },
    placeholderText: {
      fontSize: 16,
      lineHeight: 21
    }
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { InputDate };
