import { createAction, NavigationActions, Storage } from "@/utils";
import * as authService from "@/services/auth";
import { Toast } from "@ant-design/react-native";
export default {
  namespace: "Home",
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
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: "loadStorage" });
    }
  }
};
