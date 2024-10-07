import { Button, Popconfirm, Tooltip } from 'antd';
import {
  InfoCircleOutlined,
  FileExcelOutlined,
  SaveOutlined,
  DeleteOutlined,
  PauseOutlined,
  FileOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useAppSelector, useAppDispatch } from 'src/modules/hook';

import { i18n } from 'src/i18n';
import Toolbar from 'src/view/shared/styles/Toolbar';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  const ImporterToolbar = (props) => {
    const dispatch = useAppDispatch();
    const hasRows = useAppSelector(selectors.selectHasRows);
    const importing = useAppSelector(
      selectors.selectImporting,
    );
    const completed = useAppSelector(
      selectors.selectCompleted,
    );

    const doReset = () => {
      dispatch(actions.doReset());
    };

    const doPause = () => {
      dispatch(actions.doPause());
    };

    const doImport = () => {
      dispatch(actions.doImport());
    };

    const doDownloadTemplate = () => {
      dispatch(actions.doDownloadTemplate());
    };

    const showDownloadTemplate = !hasRows;
    const showImport = hasRows && !importing && !completed;
    const showDiscard = hasRows && !importing && !completed;
    const showNew = Boolean(completed);
    const showPause = hasRows && importing;

    return (
      <>
        {showDownloadTemplate && (
          <>
            <Button
              onClick={doDownloadTemplate}
              icon={<FileExcelOutlined />}
            >
              {i18n('importer.form.downloadTemplate')}
            </Button>

            {templateHelp && (
              <Tooltip title={templateHelp}>
                <InfoCircleOutlined
                  style={{
                    fontSize: '18px',
                  }}
                />
              </Tooltip>
            )}
          </>
        )}

        {showImport && (
          <Button
            onClick={doImport}
            icon={<SaveOutlined />}
            type="primary"
          >
            {i18n('common.import')}
          </Button>
        )}

        {showPause && (
          <Button
            onClick={doPause}
            icon={<PauseOutlined />}
          >
            {i18n('common.pause')}
          </Button>
        )}

        {showNew && (
          <Popconfirm
            title={i18n('common.areYouSure')}
            onConfirm={doReset}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          >
            <Button icon={<FileOutlined />}>
              {i18n('common.new')}
            </Button>
          </Popconfirm>
        )}

        {showDiscard && (
          <Popconfirm
            title={i18n('importer.list.discardConfirm')}
            onConfirm={doReset}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          >
            <Button icon={<DeleteOutlined />}>
              {i18n('common.discard')}
            </Button>
          </Popconfirm>
        )}
      </>
    );
  };

  return ImporterToolbar;
};
