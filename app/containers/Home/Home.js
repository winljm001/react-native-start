import React, { Component } from "react";
import { View, Image, Text, SafeAreaView, ImageBackground } from "react-native";
import { connect } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import { Button } from "@/components";

import { NavigationActions } from "@/utils";
import { tabBarOptions } from "@/config/bottomTab";
@connect()
class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarLabel: "列表鸭",
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
  };
  componentDidMount() {
    // this._focusListener = this.props.navigation.addListener("willFocus", () => {
    //   StatusBar.setHidden(true, "fade");
    // });
    // this._blurListener = this.props.navigation.addListener("willBlur", () => {
    //   StatusBar.setHidden(false, "fade");
    // });
  }
  componentWillUnmount() {
    // this._focusListener.remove();
    // this._blurListener.remove();
  }
  gotoDetail = () => {
    this.props.dispatch(
      NavigationActions.navigate({ routeName: "BillDetail" })
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("@/images/page_bg.png")}
          style={styles.pageBackground}
        >
          <View style={styles.header}>
            <Text>132</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  pageBackground: {
    height: "100%",
    width: "100%"
  },
  icon: {
    width: 85,
    height: 50
  },
  header: {
    height: "90rem",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: "30rem"
  }
});

export default Home;
