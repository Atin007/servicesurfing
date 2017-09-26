import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

class PrivacyPolicy extends Component {

  render() {
    return (
      <ScrollView>
        <Card>
          <Text style={{textAlign: 'justify'}}>Here is the PrivacyPolicy</Text>
        </Card>
      </ScrollView>
    );
  }

}

export default PrivacyPolicy;
