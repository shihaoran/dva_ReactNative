/**
 * Created by shi on 2017/6/14.
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'

class Square extends Component {

  handleText = (text) => {
    if (text >= 0) { return `+${text}%` }
    return `${text}%`
  }

  render() {
    return (
      <View style={styles.cubeItem}>
        <Text style={styles.cubeTitle}>{this.props.data.title}</Text>
        <Text style={styles.cubeMain}>{this.props.data.main}<Text style={styles.cubeUnit}>{this.props.data.unit}</Text></Text>
        <Text style={styles.cubeBottom}>{`${this.props.data.b2Name}:  `}<Text style={this.props.data.b2 >= 0 ? styles.cubeBottomGreen : styles.cubeBottomRed}>{this.handleText(this.props.data.b2)}</Text></Text>
        <Text style={styles.cubeBottom}>{`${this.props.data.b1Name}:  `}<Text style={this.props.data.b1 >= 0 ? styles.cubeBottomGreen : styles.cubeBottomRed}>{this.handleText(this.props.data.b1)}</Text></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cubeItem: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    width: (Dimensions.get('window').width - 30) / 3,
    height: 90,
    margin: 5,
    alignItems: 'center',
  },
  cubeTitle: {
    fontSize: 12,
    marginTop: 3,
    fontWeight: 'normal',
  },
  cubeMain: {
    fontSize: 24,
    marginTop: 0,
  },
  cubeUnit: {
    fontSize: 15,
  },
  cubeBottom: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: 'normal',
  },
  cubeBottomGreen: {
    color: '#129e00',
  },
  cubeBottomRed: {
    color: '#db0000',
  },
})

export default Square

