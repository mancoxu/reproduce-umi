import { Effect, ImmerReducer } from 'umi';

// import { ConnectState } from './connect.d';

export interface GlobalModelState {
    sideHeaderVisible: boolean;
    collapsed: boolean;
    notices: any;
}

export interface GlobalModelType {
    namespace: 'global';
    state: GlobalModelState;
    effects: {
        fetchNotices: Effect;
    };
    reducers: {
        changeLayoutCollapsed: ImmerReducer<GlobalModelState>;
        changeLayoutSideHeader: ImmerReducer<GlobalModelState>;
    };
}

const GlobalModel: GlobalModelType = {
    namespace: 'global',

    state: {
        sideHeaderVisible: true,
        collapsed: false,
        notices: [],
    },

    effects: {
        *fetchNotices(_, { call, put }) {
            const data = yield call(Promise.resolve({ a: '111' }));
            yield put({
                type: 'saveNotices',
                payload: data,
            });
            // const unreadCount: number = yield select(
            //     (state: ConnectState) => state.global.notices.filter(item => !item.read).length
            // );
            yield put({
                type: 'user/changeNotifyCount',
                payload: {
                    totalCount: data.length,
                    unreadCount: 8888,
                },
            });
        },
    },

    reducers: {
        changeLayoutSideHeader(state, { payload }) {
            state.sideHeaderVisible = payload;
        },
        changeLayoutCollapsed(state, { payload }) {
            state.collapsed = payload;
        },
    },
};

export default GlobalModel;
