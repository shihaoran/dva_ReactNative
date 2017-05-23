/**
 * Created by shi on 2017/5/23.
 */
import React, { Component } from 'react'
import { StyleSheet, View, ListView, ScrollView, RefreshControl } from 'react-native'
import { connect } from 'dva'

import ListItem from '../components/ListItem'

class MeasureList extends Component {


  _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => (
    <View
      key={`${sectionID}-${rowID}`}
      style={{
        height: adjacentRowHighlighted ? 4 : 1,
        backgroundColor: '#3B5998' }}
    />)

  _renderRow = (rowData, sectionID, rowID) => (
    <ListItem
      key={rowID}
      data={rowData}
    />)

  _onRefresh = () => {
    this.props.dispatch(NavigationActions.back())
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
          dataSource={this.props.data}
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default MeasureList
