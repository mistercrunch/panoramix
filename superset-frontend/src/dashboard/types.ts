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
import { ChartProps } from '@superset-ui/chart';
import { chart } from 'src/chart/chartReducer';

export type ChartReducerInitialState = typeof chart;

// chart query built from initialState
// Ref: https://github.com/apache/incubator-superset/blob/dcac860f3e5528ecbc39e58f045c7388adb5c3d0/superset-frontend/src/dashboard/reducers/getInitialState.js#L120
export interface ChartQueryPayload extends Partial<ChartReducerInitialState> {
  formData: ChartProps['formData'];
  // eslint-disable-next-line camelcase
  form_data?: ChartProps['rawFormData'];
  [key: string]: unknown;
}
