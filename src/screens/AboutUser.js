import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { toTitleCase } from '../helpers';

class AboutUser extends Component {

  render() {
    const user = this.props.navigation.state.params;

    return (
      <ScrollView>
        <Card>
          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingBottom: 10}}>ABOUT</Text>
            <Text style={{padding: 5}}>Name: {toTitleCase(user.name.first)} {toTitleCase(user.name.last)}</Text>
            <Text style={{padding: 5}}>City: {toTitleCase(user.location.city)}</Text>
            <Text style={{padding: 5}}>State: {toTitleCase(user.location.state)}</Text>
            <Text style={{padding: 5}}>Projects: 0</Text>
          </View>
        </Card>
        <Card>
          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingBottom: 10}}>WORK</Text>
            <Text style={{padding: 5}}>No Work Experience to display</Text>
          </View>
        </Card>
        <Card>
          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingBottom: 10}}>EDUCATION</Text>
            <Text style={{padding: 5}}>No Educational qualifications to display</Text>
          </View>
        </Card>
        <Card>
          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingBottom: 10}}>PROJECTS</Text>
            <Text style={{padding: 5}}>No Projects to display</Text>
          </View>
        </Card>
      </ScrollView>
    );
  }

}

export default AboutUser;
