/**
 * Created by shi on 2017/5/23.
 */
import React, { Component } from 'react'
import { StyleSheet, View, ListView, ScrollView, RefreshControl } from 'react-native'

import { createAction } from '../utils'

import ListItem from '../components/ListItem'

class MeasureList extends Component {

  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
    }
  }


  _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => (
    <View
      key={`${sectionID}-${rowID}`}
      style={{
        height: 0.5,
        backgroundColor: '#b7b7b7' }}
    />)

  _renderRow = (rowData, sectionID, rowID) => (
    <ListItem
      key={rowID}
      data={rowData}
      dispatch={this.props.dispatch}
      menuId={this.props.menuId}
      menuType={this.props.menuType}
    />)

  _onRefresh = () => {
    this.props.dispatch(createAction('app/getMeasureList')({
      menuId: this.props.menuId,
      menuType: this.props.menuType,
    }))
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.props.fetching}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      >
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(this.props.data)}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default MeasureList
