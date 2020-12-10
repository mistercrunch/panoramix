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

import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { t } from '@superset-ui/core';
import ActionsBar, { ActionProps } from 'src/components/ListView/ActionsBar';
import Button from 'src/components/Button';
import FacePile from 'src/components/FacePile';
import { IconName } from 'src/components/Icon';
import ListView, { FilterOperators, Filters } from 'src/components/ListView';
import SubMenu, { SubMenuProps } from 'src/components/Menu/SubMenu';
import { Switch } from 'src/common/components/Switch';
import withToasts from 'src/messageToasts/enhancers/withToasts';
import AlertStatusIcon from 'src/views/CRUD/alert/components/AlertStatusIcon';
import RecipientIcon from 'src/views/CRUD/alert/components/RecipientIcon';

import {
  useListViewResource,
  useSingleViewResource,
} from 'src/views/CRUD/hooks';
import { createErrorHandler, createFetchRelated } from 'src/views/CRUD/utils';
import AlertReportModal from './AlertReportModal';
import { AlertObject, AlertState } from './types';

const PAGE_SIZE = 25;

interface AlertListProps {
  addDangerToast: (msg: string) => void;
  addSuccessToast: (msg: string) => void;
  isReportEnabled: boolean;
  user: {
    userId: string | number;
  };
}

function AlertList({
  addDangerToast,
  isReportEnabled = false,
  user,
}: AlertListProps) {
  const title = isReportEnabled ? t('report') : t('alert');
  const pathName = isReportEnabled ? 'Reports' : 'Alerts';
  const initalFilters = useMemo(
    () => [
      {
        id: 'type',
        operator: FilterOperators.equals,
        value: isReportEnabled ? 'Report' : 'Alert',
      },
    ],
    [isReportEnabled],
  );
  const {
    state: { loading, resourceCount: alertsCount, resourceCollection: alerts },
    hasPerm,
    fetchData,
    refreshData,
  } = useListViewResource<AlertObject>(
    'report',
    t('reports'),
    addDangerToast,
    true,
    undefined,
    initalFilters,
  );

  const { updateResource } = useSingleViewResource<AlertObject>(
    'report',
    t('reports'),
    addDangerToast,
  );

  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [currentAlert, setCurrentAlert] = useState<AlertObject | null>(null);

  // Actions
  function handleAlertEdit(alert: AlertObject | null) {
    setCurrentAlert(alert);
    setAlertModalOpen(true);
  }

  const canEdit = hasPerm('can_edit');
  const canDelete = hasPerm('can_delete');
  const canCreate = hasPerm('can_add');

  const initialSort = [{ id: 'name', desc: true }];

  const toggleActive = (data: AlertObject, checked: boolean) => {
    if (data && data.id) {
      const update_id = data.id;
      updateResource(update_id, { active: checked }).then(() => {
        refreshData();
      });
    }
  };

  useEffect(() => {
    refreshData();
  }, [isReportEnabled]);

  const columns = useMemo(
    () => [
      {
        Cell: ({
          row: {
            original: { last_state: lastState },
          },
        }: any) => <AlertStatusIcon state={lastState} />,
        accessor: 'last_state',
        size: 'xs',
        disableSortBy: true,
      },
      {
        accessor: 'name',
        Header: t('Name'),
      },
      {
        Cell: ({
          row: {
            original: { recipients },
          },
        }: any) =>
          recipients.map((r: any) => (
            <RecipientIcon key={r.id} type={r.type} />
            // <Icon key={r.id} name={r.type.toLowerCase() as IconName} />
          )),
        accessor: 'recipients',
        Header: t('Notification Method'),
        disableSortBy: true,
      },
      {
        Header: t('Schedule'),
        accessor: 'crontab',
      },
      {
        accessor: 'created_by',
        disableSortBy: true,
        hidden: true,
      },
      {
        Cell: ({
          row: {
            original: { owners = [] },
          },
        }: any) => <FacePile users={owners} />,
        Header: t('Owners'),
        id: 'owners',
        disableSortBy: true,
        size: 'lg',
      },
      {
        Cell: ({ row: { original } }: any) => (
          <Switch
            data-test="toggle-active"
            checked={original.active}
            onClick={(checked: boolean) => toggleActive(original, checked)}
            size="small"
          />
        ),
        Header: t('Active'),
        accessor: 'active',
        id: 'active',
      },
      {
        Cell: ({ row: { original } }: any) => {
          const history = useHistory();
          const handleEdit = () => handleAlertEdit(original);
          const handleDelete = () => {}; // setAlertCurrentlyDeleting(original);
          const handleGotoExecutionLog = () =>
            history.push(`/${original.type.toLowerCase()}/${original.id}/log`);

          const actions = [
            canEdit
              ? {
                  label: 'execution-log-action',
                  tooltip: t('Execution Log'),
                  placement: 'bottom',
                  icon: 'note' as IconName,
                  onClick: handleGotoExecutionLog,
                }
              : null,
            canEdit
              ? {
                  label: 'edit-action',
                  tooltip: t('Edit Alert'),
                  placement: 'bottom',
                  icon: 'edit' as IconName,
                  onClick: handleEdit,
                }
              : null,
            canDelete
              ? {
                  label: 'delete-action',
                  tooltip: t('Delete Alert'),
                  placement: 'bottom',
                  icon: 'trash' as IconName,
                  onClick: handleDelete,
                }
              : null,
          ].filter(item => !!item);

          return <ActionsBar actions={actions as ActionProps[]} />;
        },
        Header: t('Actions'),
        id: 'actions',
        hidden: !canEdit && !canDelete,
        disableSortBy: true,
        size: 'xl',
      },
    ],
    [canDelete, canEdit],
  );

  const subMenuButtons: SubMenuProps['buttons'] = [];

  if (canCreate) {
    subMenuButtons.push({
      name: (
        <>
          <i className="fa fa-plus" /> {title}
        </>
      ),
      buttonStyle: 'primary',
      onClick: () => {
        handleAlertEdit(null);
      },
    });
  }

  const EmptyStateButton = (
    <Button buttonStyle="primary" onClick={() => handleAlertEdit(null)}>
      <i className="fa fa-plus" /> {title}
    </Button>
  );

  const emptyState = {
    message: t('No %s yet', title),
    slot: canCreate ? EmptyStateButton : null,
  };

  const filters: Filters = useMemo(
    () => [
      {
        Header: t('Created By'),
        id: 'created_by',
        input: 'select',
        operator: FilterOperators.relationOneMany,
        unfilteredLabel: 'All',
        fetchSelects: createFetchRelated(
          'report',
          'created_by',
          createErrorHandler(errMsg =>
            t('An error occurred while fetching created by values: %s', errMsg),
          ),
          user.userId,
        ),
        paginate: true,
      },
      {
        Header: t('Status'),
        id: 'last_state',
        input: 'select',
        operator: FilterOperators.equals,
        unfilteredLabel: 'Any',
        selects: [
          { label: t(`${AlertState.success}`), value: AlertState.success },
          { label: t(`${AlertState.working}`), value: AlertState.working },
          { label: t(`${AlertState.error}`), value: AlertState.error },
          { label: t(`${AlertState.noop}`), value: AlertState.noop },
          { label: t(`${AlertState.grace}`), value: AlertState.grace },
        ],
      },
      {
        Header: t('Search'),
        id: 'name',
        input: 'search',
        operator: FilterOperators.contains,
      },
    ],
    [],
  );

  return (
    <>
      <SubMenu
        activeChild={pathName}
        name={t('Alerts & Reports')}
        tabs={[
          {
            name: 'Alerts',
            label: t('Alerts'),
            url: '/alert/list/',
            usesRouter: true,
          },
          {
            name: 'Reports',
            label: t('Reports'),
            url: '/report/list/',
            usesRouter: true,
          },
        ]}
        buttons={subMenuButtons}
      />
      <AlertReportModal
        alert={currentAlert}
        addDangerToast={addDangerToast}
        layer={currentAlert}
        onHide={() => {
          setAlertModalOpen(false);
          refreshData();
        }}
        show={alertModalOpen}
        isReport={isReportEnabled}
      />
      <ListView<AlertObject>
        className="alerts-list-view"
        columns={columns}
        count={alertsCount}
        data={alerts}
        emptyState={emptyState}
        fetchData={fetchData}
        filters={filters}
        initialSort={initialSort}
        loading={loading}
        pageSize={PAGE_SIZE}
      />
    </>
  );
}

export default withToasts(AlertList);
