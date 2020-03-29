import request from '../util/request';

export default {
    namespace: 'charts',
    state: {
        statistic:[]
    },
    effects: {
        * getStatistic(_, sagaEffects) {
            const {call, put} = sagaEffects;
            const data = yield call(request,'/dev/charts_data')
            yield put({type: 'initCharts',payload:data});
        }
    },
    reducers: {
        initCharts(state,{payload:result}) {
            return { 
                statistic:result
            };
        },
   }
}  