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
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled, t } from '@superset-ui/core';
import { Collapse } from 'src/common/components';
import Tabs from 'src/common/components/Tabs';
import Loading from 'src/components/Loading';
import TableView, { EmptyWrapperType } from 'src/components/TableView';
import { getChartDataRequest } from 'src/chart/chartAction';
import getClientErrorObject from 'src/utils/getClientErrorObject';
import {
  CopyToClipboardButton,
  FilterInput,
  RowCount,
  useFilteredTableData,
  useTableColumns,
} from './DataTableControl';

const RESULT_TYPES = {
  results: 'results' as const,
  samples: 'samples' as const,
};

const NULLISH_RESULTS_STATE = {
  [RESULT_TYPES.results]: undefined,
  [RESULT_TYPES.samples]: undefined,
};

const TableControlsWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    flex-shrink: 0;
  }
`;

const SouthPane = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  z-index: 1;
`;

const TabsWrapper = styled.div<{ contentHeight: number }>`
  height: ${({ contentHeight }) => contentHeight}px;
  overflow: hidden;

  .table-condensed {
    height: 100%;
    overflow: auto;
  }
`;

export const DataTablesPane = ({
  queryFormData,
  tableSectionHeight,
  onCollapseChange,
}: {
  queryFormData: object;
  tableSectionHeight: number;
  onCollapseChange: (openPanelName: string) => void;
}) => {
  const [data, setData] = useState<{
    [RESULT_TYPES.results]?: object[];
    [RESULT_TYPES.samples]?: object[];
  }>(NULLISH_RESULTS_STATE);
  const [isLoading, setIsLoading] = useState(NULLISH_RESULTS_STATE);
  const [error, setError] = useState(NULLISH_RESULTS_STATE);
  const [filterText, setFilterText] = useState('');
  const [activeTabKey, setActiveTabKey] = useState<string>(
    RESULT_TYPES.results,
  );

  useEffect(() => {
    const getData = (resultType: string) => {
      setIsLoading(prevIsLoading => ({ ...prevIsLoading, [resultType]: true }));
      return getChartDataRequest({
        formData: queryFormData,
        resultFormat: 'json',
        resultType,
      })
        .then(response => {
          // Only displaying the first query is currently supported
          const result = response.result[0];
          setData(prevData => ({ ...prevData, [resultType]: result.data }));
          setIsLoading(prevIsLoading => ({
            ...prevIsLoading,
            [resultType]: false,
          }));
          setError(prevError => ({
            ...prevError,
            [resultType]: null,
          }));
        })
        .catch(response => {
          getClientErrorObject(response).then(({ error, message }) => {
            setError(prevError => ({
              ...prevError,
              [resultType]: error || message || t('Sorry, An error occurred'),
            }));
            setIsLoading(prevIsLoading => ({
              ...prevIsLoading,
              [resultType]: false,
            }));
          });
        });
    };
    getData(RESULT_TYPES.results);
    getData(RESULT_TYPES.samples);
  }, [queryFormData]);

  const filteredData = {
    [RESULT_TYPES.results]: useFilteredTableData(
      filterText,
      data[RESULT_TYPES.results],
    ),
    [RESULT_TYPES.samples]: useFilteredTableData(
      filterText,
      data[RESULT_TYPES.samples],
    ),
  };

  const columns = {
    [RESULT_TYPES.results]: useTableColumns(data[RESULT_TYPES.results]),
    [RESULT_TYPES.samples]: useTableColumns(data[RESULT_TYPES.samples]),
  };

  const changeFilterText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const renderDataTable = (type: string) => {
    if (isLoading[type]) {
      return <Loading />;
    }
    if (error[type]) {
      return <pre>{error[type]}</pre>;
    }
    if (data[type]) {
      if (data[type]?.length === 0) {
        return <span>No data</span>;
      }
      return (
        <TableView
          columns={columns[type]}
          data={filteredData[type]}
          withPagination={false}
          noDataText={t('No data')}
          emptyWrapperType={EmptyWrapperType.Small}
          className="table-condensed"
        />
      );
    }
    return null;
  };

  const TableControls = (
    <TableControlsWrapper>
      <RowCount data={data[activeTabKey]} />
      <CopyToClipboardButton data={data[activeTabKey]} />
      <FilterInput filterText={filterText} onChangeHandler={changeFilterText} />
    </TableControlsWrapper>
  );

  return (
    <SouthPane>
      <TabsWrapper contentHeight={tableSectionHeight}>
        <Collapse accordion bordered={false} onChange={onCollapseChange}>
          <Collapse.Panel header={t('Data')} key="data">
            <Tabs
              fullWidth={false}
              tabBarExtraContent={TableControls}
              activeKey={activeTabKey}
              onChange={setActiveTabKey}
            >
              <Tabs.TabPane tab={t('View results')} key={RESULT_TYPES.results}>
                {renderDataTable(RESULT_TYPES.results)}
              </Tabs.TabPane>
              <Tabs.TabPane tab={t('View samples')} key={RESULT_TYPES.samples}>
                {renderDataTable(RESULT_TYPES.samples)}
              </Tabs.TabPane>
            </Tabs>
          </Collapse.Panel>
        </Collapse>
      </TabsWrapper>
    </SouthPane>
  );
};

DataTablesPane.propTypes = {
  tableSectionHeight: PropTypes.number,
  queryFormData: PropTypes.object,
  onCollapseChange: PropTypes.func,
};
