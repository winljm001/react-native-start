import React, { PureComponent } from "react";
import { BackHandler, Animated, Easing } from "react-native";
import { createStackNavigator, NavigationActions } from "react-navigation";
import {
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
  createReduxContainer
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import mainRoute from "./mainRoute";
import Loading from "@/containers/Loading";
import Login from "@/containers/Login";

const AppNavigator = createStackNavigator(
  {
    Main: { screen: mainRoute },
    Login: { screen: Login }
  },
  {
    headerMode: "none",
    mode: "card",
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);

export const routerReducer = createNavigationReducer(AppNavigator);

export const routerMiddleware = createReactNavigationReduxMiddleware(
  state => state.router,
  "root"
);

const App = createReduxContainer(AppNavigator, "root");

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backHandle);
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router);
    if (currentScreen === "Login") {
      return true;
    }
    if (currentScreen !== "Home") {
      this.props.dispatch(NavigationActions.back());
      return true;
    }
    return false;
  };

  render() {
    const { app, dispatch, router } = this.props;
    if (app.loading) return <Loading />;

    return <App dispatch={dispatch} state={router} />;
  }
}

export default Router;
