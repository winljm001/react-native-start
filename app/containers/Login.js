import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { Button, InputItem, List } from "@ant-design/react-native";
import { NavigationActions, createAction } from "../utils";
import { Toast } from "@ant-design/react-native";
@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  loginAction = () => {
    const { username, password } = this.state;
    if (username === "" || password === "") {
      Toast.fail("请输入账号或密码");
      return false;
    }
    this.props.dispatch(
      createAction("app/login")({
        username,
        password
      })
    );
  };
  goRegister = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Register" }));
  };
  render() {
    const { fetching } = this.props;
    return (
      <View style={styles.container}>
        <List renderHeader={"登录"}>
          <InputItem
            clear
            value={this.state.username}
            onChange={username => {
              this.setState({
                username
              });
            }}
            placeholder="请输入账号"
          >
            账号：
          </InputItem>
          <InputItem
            clear
            value={this.state.password}
            type="password"
            onChange={password => {
              this.setState({
                password
              });
            }}
            placeholder="请输入密码"
          >
            密码：
          </InputItem>
          <List.Item>
            <Button
              loading={fetching}
              onPress={() => {
                // 登录
                this.loginAction();
              }}
              type="primary"
            >
              登录
            </Button>
          </List.Item>
          <List.Item>
            <Button
              onPress={() => {
                // 注册
                this.goRegister();
              }}
            >
              注册
            </Button>
          </List.Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Login;
