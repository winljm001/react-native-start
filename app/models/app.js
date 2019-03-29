import { createAction, NavigationActions, Storage } from "../utils";
import * as authService from "../services/auth";
import { Toast } from "@ant-design/react-native";
import systemConfig from "@/config/systemConfig";
const { authKey } = systemConfig;
export default {
  namespace: "app",
  state: {
    token: null,
    loading: true,
    fetching: false,
    userInfo: {}
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *loadStorage(_, { call, put }) {
      const userInfo = yield call(Storage.get, "userInfo", {});
      const token = yield call(Storage.get, authKey, "");
      yield put(
        createAction("updateState")({ userInfo, token, loading: false })
      );
    },
    // 登录
    *login({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }));
      try {
        const { code, data, msg } = yield call(authService.login, payload);
        if (code === 1) {
          yield Toast.info("登录成功");
          const token = data.apiAuth;
          yield put(createAction("updateState")({ userInfo: data, token }));
          yield Storage.set("userInfo", data);
          yield Storage.set(authKey, token);
          yield put(NavigationActions.back());
        } else {
          yield Toast.fail(msg);
        }
      } catch (error) {}
      yield put(createAction("updateState")({ fetching: false }));
    },
    // 注册
    *register({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }));
      try {
        const { code, data, msg } = yield call(authService.register, payload);
        if (code === 1) {
          yield Toast.info("注册成功");
          yield put(NavigationActions.back());
        } else {
          yield Toast.fail(msg);
        }
      } catch (error) {}
      yield put(createAction("updateState")({ fetching: false }));
    },
    // 退出登录
    *logout(_, { call, put }) {
      yield put(createAction("updateState")({ userInfo: {}, token: "" }));
      yield Storage.set("userInfo", {});
      yield Storage.set(authKey, "");
      yield put(NavigationActions.navigate({ routeName: "Login" }));
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: "loadStorage" });
    }
  }
};
