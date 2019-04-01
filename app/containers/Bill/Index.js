import React, { Component } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";
import { List } from "@ant-design/react-native";
const Item = List.Item;
import { connect } from "react-redux";

import { Button } from "@/components";
import { tabBarOptions } from "@/config/bottomTab";
import { createAction, NavigationActions } from "@/utils";

@connect(({ app }) => ({ ...app }))
class Index extends Component {
  static navigationOptions = {
    tabBarLabel: "账单编辑啦",
    tabBarOptions,
    tabBarIcon: ({ focused }) =>
      focused ? (
        <Image
          resizeMode="stretch"
          style={[styles.icon]}
          source={require("@/images/icon_bg.png")}
        />
      ) : null
  };
  componentDidMount() {}
  componentWillUnmount() {}
  goBillList = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "BillList" }));
  };
  goBillTypeList = () => {
    this.props.dispatch(
      NavigationActions.navigate({ routeName: "BillTypeList" })
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <List renderHeader={"功能列表"}>
          <Item
            onPress={() => {
              this.goBillList();
            }}
          >
            账单
          </Item>
          <Item
            onPress={() => {
              this.goBillTypeList();
            }}
          >
            账单分类
          </Item>
        </List>
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

export default Index;
