import { createAction, NavigationActions } from "@/utils";
import * as billService from "@/services/Bill";
import { Toast } from "@ant-design/react-native";
export default {
  namespace: "BillEdit",
  state: {
    fetching: false
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    // 添加账单
    *add({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }));
      try {
        const { code, data, msg } = yield call(billService.add, payload);
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
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: "loadStorage" });
    }
  }
};
