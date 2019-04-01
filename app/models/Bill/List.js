import { createAction, NavigationActions } from "@/utils";
import * as billService from "@/services/Bill";
import { Toast } from "@ant-design/react-native";
export default {
  namespace: "BillList",
  state: {
    fetching: false
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    // 获取账单列表
    *queryList({ payload }, { call, put }) {
      yield put(createAction("updateState")({ fetching: true }));
      try {
        const { code, data, msg } = yield call(billService.queryList, payload);

        yield put(createAction("updateState")({ userInfo: data, token }));
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
