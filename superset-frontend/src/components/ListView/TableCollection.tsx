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
import React from 'react';
import cx from 'classnames';
import { TableInstance } from 'react-table';
import { ReactComponent as SortIcon } from 'images/icons/sort.svg';
import { ReactComponent as SortDescIcon } from 'images/icons/sort-desc.svg';
import { ReactComponent as SortAscIcon } from 'images/icons/sort-asc.svg';

interface Props {
  getTableProps: (userProps?: any) => any;
  getTableBodyProps: (userProps?: any) => any;
  prepareRow: TableInstance['prepareRow'];
  headerGroups: TableInstance['headerGroups'];
  rows: TableInstance['rows'];
  loading: boolean;
}
export default function TableCollection({
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headerGroups,
  rows,
  loading,
}: Props) {
  return (
    <table {...getTableProps()} className="table table-hover">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
              let sortIcon = <SortIcon />;
              if (column.isSortedDesc) {
                sortIcon = <SortDescIcon />;
              } else if (!column.isSortedDesc) {
                sortIcon = <SortAscIcon />;
              }

              return column.hidden ? null : (
                <th
                  {...column.getHeaderProps(
                    column.sortable ? column.getSortByToggleProps() : {},
                  )}
                  data-test="sort-header"
                >
                  <span>{column.render('Header')}</span>
                  {column.sortable && (
                    <span className="sort-icon">{sortIcon}</span>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className={cx({
                'table-row-loader': loading,
                'table-row-selected': row.isSelected,
              })}
              onMouseEnter={() => row.setState && row.setState({ hover: true })}
              onMouseLeave={() =>
                row.setState && row.setState({ hover: false })
              }
            >
              {row.cells.map(cell => {
                if (cell.column.hidden) return null;

                const columnCellProps = cell.column.cellProps || {};

                return (
                  <td
                    className="table-cell"
                    {...cell.getCellProps()}
                    {...columnCellProps}
                  >
                    <span>{cell.render('Cell')}</span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
