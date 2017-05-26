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

  render() {
    let date
    if (this.props.sceneKey === router.favoriteKey) {
      date = this.props.favoriteDate
    } else if (this.props.sceneKey === router.kpiKey) {
      date = this.props.kpiDate
    } else if (this.props.sceneKey === router.generalKey) {
      date = this.props.generalDate
    }
    return (
      <NavBar
        {...this.props}
        rightTitle={date}
        onRight={this.onRight}
      />
    )
  }
}

export default ConnectedNavBar
