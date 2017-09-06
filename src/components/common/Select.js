import React, { Component } from 'react';
import { Dimensions, Picker, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

const Select = ({ label, options, pickerValue, modalVisibility, hideModal, showModal, onValueChange}) => {
    const { buttonStyle, buttonTextStyle, doneButtonStyle, pickerStyle, modalStyle, modalBoxStyle, containerStyle, labelStyle } = styles;

    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TouchableOpacity style={buttonStyle} onPress={showModal}>
          <Text style={buttonTextStyle}>
            {pickerValue=='' ? 'Select' : pickerValue}
          </Text>
        </TouchableOpacity>
        <Modal
          isVisible={modalVisibility}
          onBackButtonPress={hideModal}
          onBackdropPress={hideModal}
          backdropOpacity={0.40}
          style={modalStyle}
        >
          <View style={modalBoxStyle}>
            <TouchableOpacity style={doneButtonStyle} onPress={hideModal}>
              <Text style={buttonTextStyle}>Done</Text>
            </TouchableOpacity>
            <Picker
              selectedValue={pickerValue}
              onValueChange={onValueChange}
              style={pickerStyle}
            >
              {options.map((option, i) => (
                <Picker.Item key={i} label={option} value={option} />))
              }
            </Picker>
          </View>
        </Modal>
      </View>
    );
  };

const styles = {
  buttonStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    flex: 2
  },
  buttonTextStyle: {
    color: '#AA2200',
    fontSize: 18,
    lineHeight: 23
  },
  doneButtonStyle: {
    padding: 10,
    alignSelf: 'flex-end'
  },
  pickerStyle: {
    width: Dimensions.get("window").width
  },
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalBoxStyle: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelStyle: {
    fontSize: 18,
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

export { Select };
