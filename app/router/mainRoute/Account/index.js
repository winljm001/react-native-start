import Detail from "@/containers/Detail";
const pages = [{ Detail: Detail }];
const moduleName = "Account";
const StackNavigator = {};
pages.forEach(item => {
  Object.keys(item).forEach(key => {
    const router = moduleName + key;
    StackNavigator[router] = { screen: item[key] };
  });
});
export default StackNavigator;
