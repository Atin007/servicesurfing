import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card, CardSection, CardTitle, Input, Spinner } from '../components/common';
import firebase from 'firebase';

class AboutUser extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { profile } = this.props.navigation.state.params;
    this.setState(profile);
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, marginBottom: 10}}>
          <Card>
            <CardSection>
              <CardTitle label="Profile Info" />
            </CardSection>
            <CardSection>
              <Input
                editable={false}
                placeholder=""
                label="Email"
                value={this.state.email}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="First Name"
                value={this.state.firstName}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Last Name"
                value={this.state.lastName}
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <CardTitle label="Basic Info" />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Gender"
                value={this.state.gender || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Birthday"
                value={this.state.birthday || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Country"
                value={this.state.country || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="City"
                value={this.state.city || '-'}
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <CardTitle label="Work" />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Institution"
                value={this.state.institution || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Start Date"
                value={this.state.startWork || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="End Date"
                value={this.state.endWork || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Industry"
                value={this.state.industry || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Position"
                value={this.state.position || '-'}
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <CardTitle label="Education" />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="University"
                value={this.state.university || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Faculty"
                value={this.state.faculty || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Start Date"
                value={this.state.startUniv || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="End Date"
                value={this.state.endUniv || '-'}
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <CardTitle label="Price Info" />
            </CardSection>
            <CardSection>
              <Input
                editable={false}
                placeholder=""
                label="Phd"
                value={this.state.phd=="Yes" ? "Phd (H-index: " + this.state.hIndex + ")" : "No"}
              />
            </CardSection>
            <CardSection>
              <Input
                editable={false}
                placeholder=""
                label="Hourly Rate"
                value={this.state.hourlyRate || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                autoCapitalize="words"
                editable={false}
                placeholder=""
                label="Currency"
                value={this.state.currency || '-'}
              />
            </CardSection>
            <CardSection>
              <Input
                editable={false}
                placeholder=""
                label="Satisfaction Score"
                value={this.state.satisfactionScore || '-'}
              />
            </CardSection>
          </Card>
        </View>
      </ScrollView>
    );
  }

}

export default AboutUser;
