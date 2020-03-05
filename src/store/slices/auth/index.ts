import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { userInfoQuery } from './gql';
import { AppEpic } from 'store';
import { filter, map, concatAll } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { rxajax } from 'utils/ajax';

const sliceName = 'auth';

enum OAuthScope {
  public_repo = 'public_repo',
  user = 'user',
}

interface IUserInfo {
  login: string;
}
interface IAuthState {
  fetching: number;
  token: null | string;
  userInfo: null | IUserInfo;
  oauthScopes: null | OAuthScope[];
}
const defaultState: IAuthState = {
  fetching: 0,
  token: null,
  userInfo: null,
  oauthScopes: null,
};
const slice = createSlice({
  name: sliceName,
  initialState: { ...defaultState, token: localStorage.getItem('auth_token') },
  reducers: {
    reset: () => defaultState,
    fetchingUp: (state) => ({ ...state, fetching: state.fetching + 1 }),
    fetchingDown: (state) => ({ ...state, fetching: state.fetching - 1 }),
    setToken: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      token: payload,
    }),
    setUserInfo: (state, { payload }: PayloadAction<IUserInfo>) => ({
      ...state,
      userInfo: payload,
    }),
    setOauthScopes: (
      state,
      { payload }: PayloadAction<null | OAuthScope[]>
    ) => ({
      ...state,
      oauthScopes: payload,
    }),
  },
});

const { fetchingUp, fetchingDown, setUserInfo, setOauthScopes } = slice.actions;
export const { reset, setToken } = slice.actions;
export default slice.reducer;

export const getUserInfo = createAction<void>(`${sliceName}/getUserInfo`);
export const epicUserInfo: AppEpic = (action$, state$) =>
  action$.pipe(
    filter(getUserInfo.match),
    map(() =>
      from([
        of(fetchingUp()),
        rxajax(state$)(userInfoQuery()).pipe(
          map(([x, headers]) =>
            from([
              setUserInfo({
                login: x.data.viewer.login,
              }),
              setOauthScopes(
                (headers.get('X-OAuth-Scopes')?.split(', ') as OAuthScope[]) ||
                  null
              ),
            ])
          ),
          concatAll()
        ),
        of(fetchingDown()),
      ]).pipe(concatAll())
    ),
    concatAll()
  );
