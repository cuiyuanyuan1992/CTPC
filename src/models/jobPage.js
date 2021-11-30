import * as services from '../services/jobPage';

export default {
  namespace: 'job',
  state: {
    jobPage: [],
    jobList:[],
    result:'',
  },
  reducers: {
    queryPageList(state, { payload }) {
      return { ...state,jobPage:payload.data, jobList:payload.data.records};
    },

    save(state, action) {
      return { ...state,...action.payload};
    }
  },
  effects: {
    *getJobPageList({payload}, { call, put}) {
      const respense = yield call(services.queryPageJobs,payload);
      yield put({ type: "queryPageList", payload: respense});
    },

    *saveJob({payload}, { call, put}) {
      const respense = yield call(services.saveJob,payload);
      yield put({ type: "save", payload: respense});
    },

    *updateJob({payload}, { call, put}) {
      const respense = yield call(services.updateJob,payload);
      yield put({ type: "save", payload: respense});
    },

    *deleteJob({payload}, { call, put}) {
      const respense = yield call(services.deleteJob,payload);
      yield put({ type: "save", payload: respense});
    },

    *disableJob({payload}, { call, put}) {
      const respense = yield call(services.disableJob,payload);
      yield put({ type: "save", payload: respense});
    },

    *enableJob({payload}, { call, put}) {
      const respense = yield call(services.enableJob,payload);
      yield put({ type: "save", payload: respense});
    },

    *buildJob({payload}, { call, put}) {
      const respense = yield call(services.buildJob,payload);
      yield put({ type: "save", payload: respense});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
      });
    }
  },
};

