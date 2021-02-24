/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import shortid from 'shortid';
import {
  Datasource,
  DatasourceType,
  JsonObject,
  QueryFormData,
} from '@superset-ui/core';
import { Slice } from 'src/types/Chart';
import { CommonBootstrapData } from 'src/types/bootstrapTypes';

import getToastsFromPyFlashMessages from 'src/messageToasts/utils/getToastsFromPyFlashMessages';
import { getChartKey } from 'src/explore/exploreUtils';
import { getControlsState } from 'src/explore/store';
import {
  getFormDataFromControls,
  applyMapStateToPropsToControl,
} from 'src/explore/controlUtils';

export interface ExlorePageBootstrapData extends JsonObject {
  can_add: boolean;
  can_download: boolean;
  can_overwrite: boolean;
  datasource: Datasource;
  form_data: QueryFormData;
  datasource_id: number;
  datasource_type: DatasourceType;
  slice: Slice | null;
  standalone: boolean;
  user_id: number;
  forced_height: string | null;
  common: CommonBootstrapData;
}

export default function getInitialState(
  bootstrapData: ExlorePageBootstrapData,
) {
  const { form_data: initialFormData } = bootstrapData;
  const { slice } = bootstrapData;
  const sliceName = slice ? slice.slice_name : null;

  const bootstrappedState = {
    // note this will add `form_data` to state,
    // which will be manipulatable by future reducers.
    ...bootstrapData,
    sliceName,
    common: {
      flash_messages: bootstrapData.common.flash_messages,
      conf: bootstrapData.common.conf,
    },
    filterColumnOpts: [],
    isDatasourceMetaLoading: false,
    isStarred: false,
    controls: {},
  };
  const controls = getControlsState(bootstrappedState, initialFormData);
  bootstrappedState.controls = controls;

  // reset control values to initial form data value in case they are incorrectly
  // updated by `mapStateToProps` based on other controls' empty state.
  // E.g. Query Mode for table chart.
  Object.keys(controls).forEach(key => {
    controls[key].value = initialFormData[key];
  });

  // apply initial mapStateToProps for all controls, must execute AFTER
  // bootstrappedState has initialized `controls`. Order of execution is not
  // guaranteed, so controls shouldn't rely on the each other's mapped state.
  Object.entries(controls).forEach(([key, controlState]) => {
    controls[key] = applyMapStateToPropsToControl(
      controlState,
      bootstrappedState,
    );
  });

  const sliceFormData = slice
    ? getFormDataFromControls(getControlsState(bootstrapData, slice.form_data))
    : null;

  const chartKey = getChartKey(bootstrappedState);

  return {
    charts: {
      [chartKey]: {
        id: chartKey,
        chartAlert: null,
        chartStatus: null,
        chartUpdateEndTime: null,
        chartUpdateStartTime: 0,
        latestQueryFormData: getFormDataFromControls(controls),
        sliceFormData,
        queryController: null,
        queriesResponse: null,
        triggerQuery: false,
        lastRendered: 0,
      },
    },
    saveModal: {
      dashboards: [],
      saveModalAlert: null,
    },
    explore: bootstrappedState,
    impressionId: shortid.generate(),
    messageToasts: getToastsFromPyFlashMessages(
      (bootstrapData.common || {}).flash_messages || [],
    ),
  };
}

export type ExploreState = ReturnType<typeof getInitialState>;
