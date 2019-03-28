import React from "react";
import { AppRegistry, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import dva from "./utils/dva";
import Router, { routerMiddleware, routerReducer } from "./router";
import appModel from "./models/app";
import { Provider } from "@ant-design/react-native";
const app = dva({
  initialState: {},
  models: [appModel],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log("onError", e);
  }
});

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 750 });

const App = app.start(
  <Provider>
    <Router />
  </Provider>
);

AppRegistry.registerComponent("DvaStarter", () => App);
