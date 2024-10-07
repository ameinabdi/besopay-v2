import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import FilesViewer from 'src/view/shared/FilesViewer';

const BusinessDocumentsView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.type) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.businessDocuments.fields.type')}
        >
          {i18n(
            `entities.businessDocuments.enumerators.type.${record.type}`,
          )}
        </Form.Item>
      )}

      {Boolean(record.document) &&
        Boolean(record.document.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n(
              'entities.businessDocuments.fields.document',
            )}
          >
            <FilesViewer value={record.document} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default BusinessDocumentsView;
