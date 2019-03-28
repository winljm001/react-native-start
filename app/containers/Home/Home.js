import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import { Button } from "@/components";

import { NavigationActions } from "@/utils";
import { tabBarOptions } from "@/config/bottomTab";
import Echarts from "native-echarts";
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
    const option = {
      tooltip: {
        trigger: "axis"
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    const screenHeight = Dimensions.get("window").height - 210;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("@/images/page_bg.png")}
          style={styles.pageBackground}
        >
          <View style={styles.header}>
            <Text>132</Text>
          </View>
          <Echarts option={option} height={screenHeight} />
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
