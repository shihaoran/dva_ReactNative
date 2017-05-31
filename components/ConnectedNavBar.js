/**
 * Created by shi on 2017/5/26.
 */
import React, { Component } from 'react'
import { NavBar } from 'react-native-router-flux'
import { connect } from 'dva'

import { createAction } from '../utils'
import { router } from '../constants/router'

@connect(({ app }) => ({ ...app }))
class ConnectedNavBar extends Component {

  onRight = () => {
    this.props.dispatch(createAction('app/showCalendar')())
  }

  onFeedback = () => {
    this.props.dispatch(createAction('app/updateFeedback')())
  }

  render() {
    let rightTitle
    if (this.props.sceneKey === router.favoriteKey) {
      rightTitle = this.props.favoriteDate
    } else if (this.props.sceneKey === router.kpiKey) {
      rightTitle = this.props.kpiDate
    } else if (this.props.sceneKey === router.generalKey) {
      rightTitle = this.props.generalDate
    } else if (this.props.sceneKey === router.feedbackKey) {
      rightTitle = '发送'
    }
    return (
      <NavBar
        {...this.props}
        rightTitle={rightTitle}
        onRight={this.props.sceneKey === router.feedbackKey ? this.onFeedback : this.onRight}
      />
    )
  }
}

export default ConnectedNavBar
