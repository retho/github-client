import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';
import {userInfoQuery} from './gql';
import {AppEpic} from 'store';
import {filter, map, concatAll, tap, ignoreElements} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {getSliceName} from 'utils/redux';
import {combineEpics} from 'redux-observable';

const sliceName = getSliceName('auth');
export const logout = createAction<void>(`${sliceName}/logout`);

enum OAuthScope {
  public_repo = 'public_repo',
  user = 'user',
}

type UserInfo = {
  login: string;
};
type State = {
  fetching: number;
  token: null | string;
  userInfo: null | UserInfo;
  oauthScopes: null | OAuthScope[];
};

const defaultState: State = {
  fetching: 0,
  token: null,
  userInfo: null,
  oauthScopes: null,
};

const slice = createSlice({
  name: sliceName,
  initialState: {...defaultState, token: localStorage.getItem('auth_token')},
  reducers: {
    reset: () => defaultState,
    fetchingUp: (state) => ({...state, fetching: state.fetching + 1}),
    fetchingDown: (state) => ({...state, fetching: state.fetching - 1}),
    setToken: (state, {payload}: PayloadAction<string>) => ({
      ...state,
      token: payload,
    }),
    setUserInfo: (state, {payload}: PayloadAction<UserInfo>) => ({
      ...state,
      userInfo: payload,
    }),
    setOauthScopes: (state, {payload}: PayloadAction<null | OAuthScope[]>) => ({
      ...state,
      oauthScopes: payload,
    }),
  },
  extraReducers: {
    [logout.type]: () => defaultState,
  },
});

const {fetchingUp, fetchingDown, setUserInfo, setOauthScopes} = slice.actions;
export const {reset, setToken} = slice.actions;
export default slice.reducer;

const epicLogout: AppEpic = (action$) =>
  action$.pipe(
    filter(logout.match),
    tap(() => {
      localStorage.clear();
    }),
    ignoreElements(),
    concatAll()
  );

export const getUserInfo = createAction<void>(`${sliceName}/getUserInfo`);
const epicUserInfo: AppEpic = (action$, state$, {ajax}) =>
  action$.pipe(
    filter(getUserInfo.match),
    map(() =>
      from([
        of(fetchingUp()),
        ajax(userInfoQuery()).pipe(
          map((reply) => {
            if (reply.kind === 'success') {
              return from([
                setUserInfo({
                  login: reply.data.data.viewer.login,
                }),
                setOauthScopes(
                  (reply.headers.get('X-OAuth-Scopes')?.split(', ') as OAuthScope[]) || null
                ),
              ]);
            } else {
              return from([]);
            }
          }),
          concatAll()
        ),
        of(fetchingDown()),
      ]).pipe(concatAll())
    ),
    concatAll()
  );

export const epic: AppEpic = (...args) => combineEpics(epicLogout, epicUserInfo)(...args);
