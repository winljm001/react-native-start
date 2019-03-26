import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  icon: {
    width: 75,
    height: 50
  }
});
export const tabBarOptions = {
  activeTintColor: "#FA889A",
  inactiveTintColor: "#333",
  labelStyle: {
    fontSize: 12,
    position: "absolute",
    top: "50%",
    marginTop: -8,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch"
  }
};
// 不知道为什么不起作用
// export function tabBarIcon({ focused, tintColor }) {

// 	return (
//         focused?<Image
//             resizeMode="stretch"
//             style={[styles.icon]}
//             source={require("@/images/icon_bg.png")}
//             />:null
//     );
// }
