import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';
import {AppEpic} from 'store';
import {filter, map, concatAll, mapTo, mergeAll, ignoreElements} from 'rxjs/operators';
import {from, of, race, timer, interval} from 'rxjs';
import {GlobalMessage} from 'components/organisms/GlobalMessagesWrapper/GlobalMessage/GlobalMessage';
import {getSliceName} from 'utils/redux';

const sliceName = getSliceName('globalMessages');

type GlobalMessagesState = {
  nextId: number;
  messages: GlobalMessage[];
};

const defaultState: GlobalMessagesState = {
  nextId: 1,
  messages: [],
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    reset: () => defaultState,
    addMessage: (state, {payload}: PayloadAction<GlobalMessage>) => ({
      ...state,
      nextId: payload.id + 1,
      messages: state.messages.concat([payload]),
    }),
    removeMessage: (state, {payload}: PayloadAction<number>) => ({
      ...state,
      messages: state.messages.filter((x) => x.id !== payload),
    }),
  },
});

const {addMessage, removeMessage} = slice.actions;
export default slice.reducer;

export type ShowMessagePayload = {
  message: Omit<GlobalMessage, 'id'>;
  hideIn: null | number;
};
export const showMessage = createAction<ShowMessagePayload>(`${sliceName}/showMessage`);
export const hideMessage = createAction<number>(`${sliceName}/hideMessage`);
export const epicShowMessage: AppEpic = (action$, state$) =>
  action$.pipe(
    filter(showMessage.match),
    map((action) => ({
      payload: action.payload,
      messageId: state$.value.globalMessages.nextId,
    })),
    map(({payload, messageId}) =>
      from([
        of(addMessage({id: messageId, ...payload.message})),
        race([
          action$.pipe(
            filter(hideMessage.match),
            filter((act) => act.payload === messageId)
          ),
          payload.hideIn ? timer(payload.hideIn) : interval(100_000_000).pipe(ignoreElements()),
        ]).pipe(mapTo(removeMessage(messageId))),
      ])
    ),
    concatAll(),
    mergeAll()
  );
