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
import { ReactNode } from 'react';
import { styled } from '@superset-ui/core';
import { $anyType } from 'src/constants';

export interface BaseFilter {
  Header: ReactNode;
  initialValue: $anyType;
}

export const FilterContainer = styled.div`
  display: inline-flex;
  margin-right: 2em;
  font-size: ${({ theme }) => theme.typography.sizes.s}px;
`;

export const FilterTitle = styled.label`
  font-weight: bold;
  line-height: 27px;
  margin: 0 0.4em 0 0;
`;
