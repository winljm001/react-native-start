import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Home from "@/containers/Home/Home";
import Account from "@/containers/Account/Account";
import Bill from "@/containers/Bill/Index";
import BillRoute from "./Bill";

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Bill: { screen: Bill },
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
