import React, { Component } from "react";
import { StyleSheet, View, Image, StatusBar, SafeAreaView } from "react-native";
import { connect } from "react-redux";

import { Button } from "@/components";

import { NavigationActions } from "@/utils";

@connect()
class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarLabel: "Home",
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          style={[styles.icon, { tintColor: focused ? tintColor : "gray" }]}
          source={require("@/images/house.png")}
        />
      )
    };
  };
  componentDidMount() {
    this._focusListener = this.props.navigation.addListener("willFocus", () => {
      StatusBar.setHidden(true, "fade");
    });
    this._blurListener = this.props.navigation.addListener("willBlur", () => {
      StatusBar.setHidden(false, "fade");
    });
  }
  componentWillUnmount() {
    this._focusListener.remove();
    this._blurListener.remove();
  }
  gotoDetail = () => {
    this.props.dispatch(
      NavigationActions.navigate({ routeName: "BillDetail" })
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button text="Goto Detail11" onPress={this.gotoDetail} />
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
    width: 32,
    height: 32
  }
});

export default Home;
