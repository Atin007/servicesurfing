import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, CardSection, CardTitle, Input, InputDate, Select, Spinner, TextButton } from '../components/common';
import firebase from 'firebase';
import { Countries, CitiesByCountry, Currencies, Industries, Universities } from '../choices';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = { country: '', city: '', industry: '', university: '' };
  }

  componentWillMount() {
    const { filterCountry, filterCity, filterIndustry, filterUniversity } = this.props.navigation.state.params;
    this.setState({
      country: filterCountry,
      city: filterCity,
      industry: filterIndustry,
      university: filterUniversity
    });
  }

  onButtonPress() {
    this.props.navigation.navigate('Search', {
      filterCountry: this.state.country,
      filterCity: this.state.city,
      filterIndustry: this.state.industry,
      filterUniversity: this.state.university
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={() => this.onButtonPress()}>Save</Button>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, marginBottom: 10}}>
          <Card>
            <CardSection>
              <CardTitle label="Apply Filters" />
            </CardSection>
            <CardSection>
              <Select
                label="Country"
                options={Countries}
                pickerValue={this.state.country}
                modalVisibility={this.state.modalVisibility==2}
                showModal={()=>{this.setState({modalVisibility: 2})}}
                hideModal={()=>{this.setState({modalVisibility: 0})}}
                onValueChange={(country) => {this.setState({city: ''}); if (country != "Select") {this.setState({country: country})} else {this.setState({country: ''})}}}
              />
            </CardSection>
            <CardSection>
              <Select
                label="City"
                options={CitiesByCountry[this.state.country]}
                pickerValue={this.state.city}
                modalVisibility={this.state.modalVisibility==3}
                showModal={()=>{this.setState({modalVisibility: 3})}}
                hideModal={()=>{this.setState({modalVisibility: 0})}}
                onValueChange={(city) => {if (city != "Select") {this.setState({city: city})} else {this.setState({city: ''})}}}
              />
            </CardSection>
            <CardSection>
              <Select
                label="Industry"
                options={Industries}
                pickerValue={this.state.industry}
                modalVisibility={this.state.modalVisibility==4}
                showModal={()=>{this.setState({modalVisibility: 4})}}
                hideModal={()=>{this.setState({modalVisibility: 0})}}
                onValueChange={(industry) => {if (industry != "Select") {this.setState({industry: industry})} else {this.setState({industry: ''})}}}
              />
            </CardSection>
            <CardSection>
              <Select
                label="University"
                options={Universities}
                pickerValue={this.state.university}
                modalVisibility={this.state.modalVisibility==5}
                showModal={()=>{this.setState({modalVisibility: 5})}}
                hideModal={()=>{this.setState({modalVisibility: 0})}}
                onValueChange={(university) => {if (university != "Select") {this.setState({university: university})} else {this.setState({university: ''})}}}
              />
            </CardSection>
          </Card>
          {this.renderButton()}
        </View>
      </ScrollView>
    );
  }

}

export default Filters;
