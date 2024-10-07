import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/banks/importer/banksImporterSelectors';
import BanksService from 'src/modules/banks/banksService';
import fields from 'src/modules/banks/importer/banksImporterFields';
import { i18n } from 'src/i18n';

const banksImporterActions = importerActions(
  'BANKS_IMPORTER',
  selectors,
  BanksService.import,
  fields,
  i18n('entities.banks.importer.fileName'),
);

export default banksImporterActions;