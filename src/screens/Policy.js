import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Card } from 'react-native-elements';

import { privacyPolicy } from '../config/data';

class Policy extends Component {

  render() {
    return (
      <ScrollView>
        <Card>
          <Text style={{textAlign: 'justify'}}>{privacyPolicy.text}</Text>
        </Card>
      </ScrollView>
    );
  }

}

export default Policy;
