import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import { List } from "@ant-design/react-native";
const Item = List.Item;
import { connect } from "react-redux";

import { Button } from "@/components";
import { tabBarOptions } from "@/config/bottomTab";
import { createAction, NavigationActions } from "@/utils";

@connect(({ BillList }) => ({ ...BillList }))
class BillList extends Component {
  static navigationOptions = {
    title: "账单列表"
  };
  componentDidMount() {
    this.props.dispatch(createAction("BillList/queryList")());
  }
  componentWillUnmount() {}

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <List>
            <Item>账单</Item>
          </List>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: 85,
    height: 50
  }
});

export default BillList;
