/**
 * Created by shi on 2017/5/23.
 */
import React, { Component } from 'react'
import { StyleSheet, View, ListView, ScrollView, RefreshControl } from 'react-native'

import { createAction } from '../utils'

import ListItem from '../components/ListItem'
import MeasureList from '../components/MeasureList'

import { env } from '../constants/environment'

class FavoriteList extends MeasureList {

  _renderRow = (rowData, sectionID, rowID) => (
    <ListItem
      key={rowID}
      data={rowData}
      dispatch={this.props.dispatch}
      menuId="0"
      menuType={env.menuType.favorite}
    />)

  _onRefresh = () => {
    this.props.dispatch(createAction('app/getMeasureFavorites')())
  }
}

export default FavoriteList
