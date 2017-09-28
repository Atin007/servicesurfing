import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';

class PDFView extends Component {
  constructor(props) {
    super(props);
    this.pdf = null;
  }

  render() {
    const { fileURL } = this.props.navigation.state.params;
    let source = {uri: fileURL, cache: true};

    const { pdfContainer, pdfStyle } = styles;

    return (
      <View style={pdfContainer}>
        <Pdf ref={(pdf)=>{this.pdf = pdf;}}
          source={source}
          page={1}
          horizontal={false}
          style={pdfStyle}
        />
      </View>
    );
  }
}

const styles = {
  pdfContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pdfStyle: {
    flex:1,
    width:Dimensions.get('window').width,
  }
};

export default PDFView;
