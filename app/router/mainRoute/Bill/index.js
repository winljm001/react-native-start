import Detail from "@/containers/Bill/Detail";
import List from "@/containers/Bill/List";
import TypeList from "@/containers/Bill/TypeList";
const pages = [
  {
    Detail: Detail,
    List: List,
    TypeList: TypeList
  }
];
const moduleName = "Bill";
const StackNavigator = {};
pages.forEach(item => {
  Object.keys(item).forEach(key => {
    const router = moduleName + key;
    StackNavigator[router] = { screen: item[key] };
  });
});
export default StackNavigator;
