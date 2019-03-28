import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { Button, InputItem, List } from "@ant-design/react-native";
import { NavigationActions, createAction } from "../utils";
import { Toast } from "@ant-design/react-native";
@connect(({ app }) => ({ ...app }))
class Register extends Component {
  static navigationOptions = {
    title: "注册"
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password1: ""
    };
  }
  registerAction = () => {
    const { username, password, password1 } = this.state;
    if (username === "" || password === "") {
      Toast.fail("请输入账号或密码");
      return false;
    }
    if (password1 === "") {
      Toast.fail("请再次确认密码");
      return false;
    }
    if (password1 !== password) {
      Toast.fail("两次密码不一致");
      return false;
    }
    this.props.dispatch(
      createAction("app/register")({
        username,
        password
      })
    );
  };

  render() {
    const { fetching } = this.props;
    return (
      <View style={styles.container}>
        <List renderHeader={"注册"}>
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
          <InputItem
            clear
            value={this.state.password1}
            type="password"
            onChange={password1 => {
              this.setState({
                password1
              });
            }}
            placeholder="请输入密码确认一瞎"
          >
            再次：
          </InputItem>
          <List.Item>
            <Button
              loading={fetching}
              type="primary"
              onPress={() => {
                // 注册
                this.registerAction();
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

export default Register;
