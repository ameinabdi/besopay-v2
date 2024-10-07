/**
 * Storage permissions.
 *
 * @id - Used to identify the rule on permissions and upload.
 * @folder - Folder where the files will be saved
 * @maxSizeInBytes - Max allowed size in bytes
 * @bypassWritingPermissions - Does not validate if the user has permission to write
 * @publicRead - The file can be publicly accessed via the URL without the need for a signed token
 */
export default class Storage {
  static get values() {
    return {
      userAvatarsProfiles: {
        id: 'userAvatarsProfiles',
        folder: 'user/avatars/profile/:userId',
        maxSizeInBytes: 10 * 1024 * 1024,
        bypassWritingPermissions: true,
        publicRead: true,
      },
      settingsLogos: {
        id: 'settingsLogos',
        folder: 'tenant/:tenantId/settings/logos',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      settingsBackgroundImages: {
        id: 'settingsBackgroundImages',
        folder:
          'tenant/:tenantId/settings/backgroundImages',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      entityFiles: {
        id: 'entityFiles',
        folder: 'tenant/:tenantId/entity/files',
        maxSizeInBytes: 2,
      },
      entityImages: {
        id: 'entityImages',
        folder: 'tenant/:tenantId/entity/images',
        maxSizeInBytes: 3,
      },
      categoryThumnail: {
        id: 'categoryThumnail',
        folder: 'tenant/:tenantId/category/thumnail',
        maxSizeInBytes: 100 * 1024 * 1024,
      },


      storeStoreImage: {
        id: 'storeStoreImage',
        folder: 'tenant/:tenantId/store/storeImage',
        maxSizeInBytes: 100 * 1024 * 1024,
      },





      productProductImages: {
        id: 'productProductImages',
        folder: 'tenant/:tenantId/product/productImages',
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      businessDocumentsDocument: {
        id: 'businessDocumentsDocument',
        folder: 'tenant/:tenantId/businessDocuments/document',
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      paymentMethodPaymentMethodLogo: {
        id: 'paymentMethodPaymentMethodLogo',
        folder: 'tenant/:tenantId/paymentMethod/paymentMethodLogo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      paymentMethodPaymentMethodThumbnail: {
        id: 'paymentMethodPaymentMethodThumbnail',
        folder: 'tenant/:tenantId/paymentMethod/paymentMethodThumbnail',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

    };
  }
}
