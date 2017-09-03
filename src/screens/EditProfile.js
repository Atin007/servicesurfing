import React, { Component } from 'react';
import {
  Platform, 
  ScrollView,
  StyleSheet,
  Text,
  View
 } from 'react-native';
import {
  Button,
  Card,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

class EditProfile extends Component {

  render() {
    const options = ['Male', 'Female'];

    // Labels is optional
    const labels = ['Banana', 'Apple', 'Pear'];
    return (
      <ScrollView style={styles.topLevelContainer}>
        <Card
          title="About"
          titleStyle={{alignSelf: 'flex-start'}}
          >
          <FormLabel>First Name</FormLabel>
          <FormInput
            placeholder="John"
            autoCorrect={false}
            style={styles.formInputStyle}
          />
          <FormLabel>Last Name</FormLabel>
          <FormInput
            placeholder="Doe"
            autoCorrect={false}
            style={styles.formInputStyle}
          />
          <FormLabel>Description</FormLabel>
          <FormInput
            multiline = {true}
            numberOfLines = {4}
            placeholder="Tell something about yourself"
            autoCorrect={false}
            style={styles.formInputStyle}
          />
          <FormLabel>Birthday</FormLabel>
          <DatePicker
            date=''
            mode="date"
            placeholder="YYYY-MM-DD"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2017-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={styles.customDateInputStyles}
            // onDateChange={(date) => {this.setState({date: date});}}
          />
          <FormLabel>Gender</FormLabel>
        </Card>
      </ScrollView>
    );
  }

}

const styles = {
  topLevelContainer: {
    flex: 1
  },
  formInputStyle: {
    margin: 4,
    fontSize: 14,
    color: '#000'
  },
  customDateInputStyles: {
    dateInput: {
      alignItems: 'flex-start',
      borderWidth: 0,
      borderBottomWidth: (Platform.OS === 'ios') ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: '#86939e',
      height: 20,
      marginLeft: 20,
      marginRight: 20,
      paddingLeft: 5
    }
  }
};

export default EditProfile;
