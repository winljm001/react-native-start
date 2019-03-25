import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Home from "@/containers/Home/Home";
import Account from "@/containers/Account/Account";
import BillRoute from "./Bill";

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Account: { screen: Account }
  },
  {
    tabBarOptions: {
      style: {}
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  return {
    headerTitle: routeName,
    header: null
  };
};

export default createStackNavigator(
  {
    TabNavigator: { screen: TabNavigator },
    ...BillRoute
  },
  {
    headerMode: "float",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
