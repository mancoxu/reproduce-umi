import { Effect } from 'dva';
import { Reducer } from 'redux';
import { fetchUser, logout } from '@/services/user';
import { removeLocalStorage } from '@/utils/storage';

import { CurrentUser } from './user.d';

type CurrentUserState = { currentUser: CurrentUser | undefined };
type ErrorState = { error: Error | undefined };

export interface UserModelState extends CurrentUserState, ErrorState {}

export interface UserModelType {
    namespace: 'user';
    state: UserModelState;
    effects: {
        [key: string]: Effect;
    };
    reducers: {
        saveCurrentUser: Reducer<CurrentUserState>;
        actionFailed: Reducer<ErrorState>;
    };
}

const UserModel: UserModelType = {
    namespace: 'user',
    state: {
        currentUser: undefined,
        // manageName: localStorage.manageName,
        error: undefined,
    },

    effects: {
        *fetchUserInfo(_, { call, put }) {
            try {
                const data = yield call(fetchUser);
                yield put({
                    type: 'saveCurrentUser',
                    payload: data,
                });
            } catch (error) {
                yield put({ type: 'actionFailed', payload: new Error(error) });
            }
        },

        *logout(_, { call, put }) {
            removeLocalStorage('manageName');
            yield call(logout);
            yield put({ type: 'saveCurrentUser', payload: null });
        },
    },

    reducers: {
        saveCurrentUser(state, action) {
            // localStorage.yzh_dealer_id = action.payload.dealer_id;
            return {
                ...state,
                currentUser: action.payload,
            };
        },
        actionFailed(state, action) {
            return {
                ...state,
                error: action.payload,
            };
        },
    },
};

export default UserModel;
