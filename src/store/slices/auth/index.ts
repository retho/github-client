import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';
import {userInfoQuery} from './gql';
import {AppEpic} from 'store';
import {filter, map, concatAll} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {getSliceName} from 'utils/redux';

const sliceName = getSliceName('auth');

enum OAuthScope {
  public_repo = 'public_repo',
  user = 'user',
}

type UserInfo = {
  login: string;
};
type AuthState = {
  fetching: number;
  token: null | string;
  userInfo: null | UserInfo;
  oauthScopes: null | OAuthScope[];
};
const defaultState: AuthState = {
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
});

const {fetchingUp, fetchingDown, setUserInfo, setOauthScopes} = slice.actions;
export const {reset, setToken} = slice.actions;
export default slice.reducer;

export const getUserInfo = createAction<void>(`${sliceName}/getUserInfo`);
export const epicUserInfo: AppEpic = (action$, state$, {ajax}) =>
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
