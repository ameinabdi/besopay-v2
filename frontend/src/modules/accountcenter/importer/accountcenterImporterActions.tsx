import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/accountcenter/importer/accountcenterImporterSelectors';
import AccountcenterService from 'src/modules/accountcenter/accountcenterService';
import fields from 'src/modules/accountcenter/importer/accountcenterImporterFields';
import { i18n } from 'src/i18n';

const accountcenterImporterActions = importerActions(
  'ACCOUNTCENTER_IMPORTER',
  selectors,
  AccountcenterService.import,
  fields,
  i18n('entities.accountcenter.importer.fileName'),
);

export default accountcenterImporterActions;