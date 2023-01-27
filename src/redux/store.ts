import { configureStore } from '@reduxjs/toolkit';
import isDrawerOpenReducer from './drawer/isDrawerOpenSlice';
import authReducer from './auth/authSlice';
import calendarViewReducer from './calendar/calendarViewSlice';
import calendarNaviReducer from './calendar/calendarNaviSlice';
import calendarMonthReducer from './calendar/calendarMonthSlice';
import calendarModalReducer from './calendar/calendarModalSlice';
import selectDateTimeInfoReducer from './calendar/schedule/selectDateTimeInfoSlice';
import selectScheduleInfoReducer from './calendar/schedule/scheduleInfoSlice';
import calendarVisibilityReducer from './calendar/calendarVisibilitySlice';

const store = configureStore({
  reducer: {
    isDrawerOpen: isDrawerOpenReducer,
    auth: authReducer,
    calendarView: calendarViewReducer,
    calendarNavi: calendarNaviReducer,
    calendarMonth: calendarMonthReducer,
    calendarModal: calendarModalReducer,
    calendarVisibility: calendarVisibilityReducer,
    selectDateTimeInfo: selectDateTimeInfoReducer,
    scheduleInfo: selectScheduleInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['selectDateTimeInfo/setInfo'],
        ignoredActionPaths: [],
        ignoredPaths: [
          'selectDateTimeInfo.value.start',
          'selectDateTimeInfo.value.end',
          'selectDateTimeInfo.value.nativeEvent',
        ],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
