import { createAction, NavigationActions } from "@/utils";
import * as billService from "@/services/Bill";
import { Toast } from "@ant-design/react-native";
export default {
  namespace: "BillTypeList",
  state: {
    fetching: false,
    billTypeList: []
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    // 获取账单列表
    *queryTypeList({ payload }, { call, put, select }) {
      yield alert(1);
      // yield put(createAction("updateState")({ fetching: true }));
      // try {
      //   const userInfo=yield select(state => state['app'].userInfo)
      //   yield alert(JSON.stringify(userInfo))
      //   const { code, data, msg } = yield call(billService.queryTypeList, payload);

      //   yield put(createAction("updateState")({ billTypeList: data }));
      // } catch (error) {}
      // yield put(createAction("updateState")({ fetching: false }));
    }
  }
};
