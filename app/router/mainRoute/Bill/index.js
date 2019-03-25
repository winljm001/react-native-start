import Detail from "@/containers/Bill/Detail";
const pages = [{ Detail: Detail }];
const moduleName = "Bill";
const StackNavigator = {};
pages.forEach(item => {
  Object.keys(item).forEach(key => {
    const router = moduleName + key;
    StackNavigator[router] = { screen: item[key] };
  });
});
export default StackNavigator;
