import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/productOptions/importer/productOptionsImporterSelectors';
import ProductOptionsService from 'src/modules/productOptions/productOptionsService';
import fields from 'src/modules/productOptions/importer/productOptionsImporterFields';
import { i18n } from 'src/i18n';

const productOptionsImporterActions = importerActions(
  'PRODUCTOPTIONS_IMPORTER',
  selectors,
  ProductOptionsService.import,
  fields,
  i18n('entities.productOptions.importer.fileName'),
);

export default productOptionsImporterActions;