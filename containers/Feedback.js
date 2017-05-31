import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Dimensions } from 'react-native'
import { connect } from 'dva'

import { createAction } from '../utils'

@connect(({ app }) => ({ ...app }))
class Feedback extends Component {

  onChange = (text) => {
    this.props.dispatch(createAction('app/setFeedback')({ data: text }))
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <TextInput
          style={styles.text}
          multiline
          onChangeText={this.onChange}
          value={this.props.feedback}
          placeholder="请留下您的宝贵意见"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  text: {
    flex: 1,
    fontSize: 15,
    width: Dimensions.get('window').width,
    textAlignVertical: 'top',
  },
})

export default Feedback
