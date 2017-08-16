import React, { Component } from 'react';
import { Button, Dimensions, ScrollView, Text, View } from 'react-native';

import { Avatar, Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { toTitleCase } from '../helpers';
const window = Dimensions.get("window");

class RequestAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: ''
    };
  }

  render() {
    const user = this.props.navigation.state.params;

    return (
      <View style={{alignItems: 'center'}}>
        <Card containerStyle={{width: 0.7*window.width}}>
          <View style={{alignItems: 'center'}}>
            <Avatar
              rounded
              large
              source={{uri: user.picture.large}}
            />
            <Text style={{fontSize: 17, padding: 10}}>{toTitleCase(user.name.first)} {toTitleCase(user.name.last)}</Text>
            <Text style={{padding: 10}}>Schedule Date/Time</Text>
            <View style={{padding: 10}}>
              <DatePicker
                style={{width: 160}}
                date={this.state.date}
                mode="date"
                placeholder="YYYY-MM-DD"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2017-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                    dateInput: {
                      height: 30
                    }
                }}
                onDateChange={(date) => {this.setState({date: date});}}
              />
            </View>
            <View>
              <DatePicker
                style={{width: 160}}
                date={this.state.time}
                mode="time"
                placeholder="HH:mm"
                format="HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                    dateInput: {
                      height: 30
                    }
                }}
                onDateChange={(time) => {this.setState({time: time});}}
              />
            </View>
            <View>
              <Button title="Send" onPress={() => console.log('Test')}/>
            </View>
          </View>
        </Card>
      </View>


    );
  }

}


export default RequestAppointment;
