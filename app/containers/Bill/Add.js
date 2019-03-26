import React, { Component } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";
import { connect } from "react-redux";

import { Button } from "@/components";
import { tabBarOptions } from "@/config/bottomTab";
import { createAction, NavigationActions } from "@/utils";

@connect(({ app }) => ({ ...app }))
class Add extends Component {
  static navigationOptions = {
    tabBarLabel: "添加一个",
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
  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Login" }));
  };

  logout = () => {
    this.props.dispatch(createAction("app/logout")());
  };

  render() {
    const { login } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text>add</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 85,
    height: 50
  }
});

export default Add;
