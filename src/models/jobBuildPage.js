import * as services from '../services/jobBuildPage';

export default {
  namespace: 'jobBuild',
  state: {
    jobBuildPage: [],
    jobBuildList:[],
    buildLog:[],
  },
  reducers: {
    queryPageList(state, { payload }) {
      return { ...state,jobBuildPage:payload.data, jobBuildList:payload.data.records};
    },
    save(state, action) {
      return { ...state,...action.payload};
    },
    getLog(state, { payload }){
      return { ...state,buildLog:payload.data};
    }
  },
  effects: {
    *getJobBuildPageList({payload}, { call, put}) {
      const respense = yield call(services.queryPageJobBuilds,payload);
      yield put({ type: "queryPageList", payload: respense});
    },

    *stopBuild({payload}, { call, put}) {
      const respense = yield call(services.stopBuild,payload);
      yield put({ type: "save", payload: respense});
    },

    *getBuildLog({payload}, { call, put}) {
      const respense = yield call(services.getBuildLog,payload);
      console.info(respense);
      yield put({ type: "getLog", payload: respense});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
      });
    }
  },
};

