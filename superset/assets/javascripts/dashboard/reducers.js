import { combineReducers } from 'redux';
import d3 from 'd3';

import charts, { chart } from '../chart/chartReducer';
import * as actions from './actions';
import { getParam } from '../modules/utils';
import { alterInArr, removeFromArr } from '../reduxUtils';
import { applyDefaultFormData } from '../explore/stores/store';

export function getInitialState(bootstrapData) {
  const { user_id, datasources, common } = bootstrapData;
  delete common.locale;
  delete common.language_pack;

  const dashboard = Object.assign({}, bootstrapData.dashboard_data);
  const filters = {};
  try {
    // allow request parameter overwrite dashboard metadata
    const filterData = JSON.parse(getParam('preselect_filters') || dashboard.metadata.default_filters);
    for (const key in filterData) {
      const sliceId = parseInt(key, 10);
      filters[sliceId] = filterData[key];
    }
  } catch (e) {
    //
  }

  dashboard.posDict = {};
  dashboard.layout = [];
  if (dashboard.position_json) {
    dashboard.position_json.forEach((position) => {
      dashboard.posDict[position.slice_id] = position;
    });
  }
  dashboard.slices.forEach((slice, index) => {
    const sliceId = slice.slice_id;
    let pos = dashboard.posDict[sliceId];
    if (!pos) {
      pos = {
        col: (index * 4 + 1) % 12,
        row: Math.floor((index) / 3) * 4,
        size_x: 4,
        size_y: 4,
      };
    }

    dashboard.layout.push({
      i: String(sliceId),
      x: pos.col - 1,
      y: pos.row,
      w: pos.size_x,
      minW: 2,
      h: pos.size_y,
    });
  });

  // will use charts action/reducers to handle chart render
  const initCharts = {};
  dashboard.slices.forEach((slice) => {
    const chartKey = 'slice_' + slice.slice_id;
    initCharts[chartKey] =
      Object.assign({}, chart, {
        chartKey,
        slice_id: slice.slice_id,
        form_data: slice.form_data,
        formData: applyDefaultFormData(slice.form_data),
      });
  });

  // also need to add formData for dashboard.slices
  dashboard.slices = dashboard.slices.map(
    slice => (Object.assign({}, slice,
      { formData: applyDefaultFormData(slice.form_data) })));

  return {
    charts: initCharts,
    dashboard: Object.assign({}, { filters, dashboard, userId: user_id, datasources, common }),
  };
}

const dashboard = function (state = {}, action) {
  const actionHandlers = {
    [actions.UPDATE_DASHBOARD_TITLE]() {
      const newDashboard = Object.assign({}, state.dashboard, { dashboard_title: action.title });
      return Object.assign({}, state, { dashboard: newDashboard });
    },
    [actions.UPDATE_DASHBOARD_LAYOUT]() {
      const newDashboard = Object.assign({}, state.dashboard, { layout: action.layout });
      return Object.assign({}, state, { dashboard: newDashboard });
    },
    [actions.REMOVE_SLICE]() {
      const newLayout = state.dashboard.layout.filter(function (reactPos) {
        return reactPos.i !== String(action.slice.slice_id);
      });
      let newDashboard = removeFromArr(state.dashboard, 'slices', action.slice, 'slice_id');
      newDashboard = Object.assign({}, newDashboard, { layout: newLayout });
      return Object.assign({}, state, { dashboard: newDashboard });
    },
    [actions.TOGGLE_FAVE_STAR]() {
      return Object.assign({}, state, { isStarred: action.isStarred });
    },
    [actions.TOGGLE_EXPAND_SLICE]() {
      const updatedExpandedSlices = Object.assign({}, state.dashboard.metadata.expanded_slices);
      const sliceId = action.slice.slice_id;
      if (action.isExpanded) {
        updatedExpandedSlices[sliceId] = true;
      } else {
        delete updatedExpandedSlices[sliceId];
      }
      const metadata = Object.assign({}, state.dashboard.metadata,
        { expanded_slices: updatedExpandedSlices });

      return Object.assign({}, state, {
        dashboard: Object.assign({}, state.dashboard, { metadata }),
      });
    },

    // filters
    [actions.ADD_FILTER]() {
      const selectedSlice = state.dashboard.slices
        .find(slice => (slice.slice_id === action.sliceId));
      if (!selectedSlice) {
        return state;
      }

      let filters = Object.assign({}, state.filters);
      const { sliceId, col, vals, merge, refresh } = action;
      const filterKeys = ['__from', '__to', '__time_col',
        '__time_grain', '__time_origin', '__granularity'];
      if (filterKeys.indexOf(col) >= 0 ||
        selectedSlice.formData.groupby.indexOf(col) !== -1) {
        if (!(sliceId in state.filters)) {
          filters = Object.assign({}, filters, { [sliceId]: {} });
        }

        let newFilter = {};
        if (filters[sliceId] && !(col in filters[sliceId]) || !merge) {
          newFilter = Object.assign({}, filters[sliceId], { [col]: vals });
          // d3.merge pass in array of arrays while some value form filter components
          // from and to filter box require string to be process and return
        } else if (filters[sliceId][col] instanceof Array) {
          newFilter = d3.merge([filters[sliceId][col], vals]);
        } else {
          newFilter = d3.merge([[filters[sliceId][col]], vals])[0] || '';
        }
        filters = Object.assign({}, filters, { [sliceId]: newFilter });
      }
      return Object.assign({}, state, { filters, refresh });
    },
    [actions.CLEAR_FILTER]() {
      const newFilters = Object.assign({}, state.filters);
      delete newFilters[action.sliceId];

      return Object.assign({}, state, { filter: newFilters, refresh: true });
    },
    [actions.REMOVE_FILTER]() {
      const newFilters = Object.assign({}, state.filters);
      const { sliceId, col, vals } = action;

      if (sliceId in state.filters) {
        if (col in state.filters[sliceId]) {
          const a = [];
          newFilters[sliceId][col].forEach(function (v) {
            if (vals.indexOf(v) < 0) {
              a.push(v);
            }
          });
          newFilters[sliceId][col] = a;
        }
      }
      return Object.assign({}, state, { filter: newFilters, refresh: true });
    },

    // slice reducer
    [actions.UPDATE_SLICE_NAME]() {
      const newDashboard = alterInArr(
        state.dashboard, 'slices',
        action.slice, { slice_name: action.sliceName },
        'slice_id');
      return Object.assign({}, state, { dashboard: newDashboard });
    },
  };

  if (action.type in actionHandlers) {
    return actionHandlers[action.type]();
  }
  return state;
};

export default combineReducers({
  charts,
  dashboard,
});
