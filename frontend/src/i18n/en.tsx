const en = {
  common: {
    or: 'or',
    cancel: 'Cancel',
    reset: 'Reset',
    save: 'Save',
    search: 'Search',
    edit: 'Edit',
    remove: 'Remove',
    new: 'New',
    export: 'Export to Excel',
    noDataToExport: 'No data to export',
    import: 'Import',
    discard: 'Discard',
    yes: 'Yes',
    no: 'No',
    pause: 'Pause',
    areYouSure: 'Are you sure?',
    view: 'View',
    destroy: 'Delete',
    mustSelectARow: 'Must select a row',
    filters: 'Filters',
    actions:'Actions'
  },

  app: {
    title: 'Besopay',
    shortTitle: 'AP'
  },

  api: {
    menu: 'API',
  },

  entities: {
    refund: {
      name: 'refund',
      label: 'Refunds',
      menu: 'Refunds',
      exporterFileName: 'refund_export',
      list: {
        menu: 'Refunds',
        title: 'Refunds',
      },
      create: {
        success: 'Refund successfully saved',
      },
      update: {
        success: 'Refund successfully saved',
      },
      destroy: {
        success: 'Refund successfully deleted',
      },
      destroyAll: {
        success: 'Refund(s) successfully deleted',
      },
      edit: {
        title: 'Edit Refund',
      },
      fields: {
        id: 'Id',
        'transaction': 'Transaction',
        'transactionAmoundRange': 'TransactionAmound',
        'transactionAmound': 'TransactionAmound',
        'refundType': 'RefundType',
        'customerNote': 'CustomerNote',
        'businessNote': 'BusinessNote',
        'customer': 'Customer',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        'refundType': {
          'Full': 'Full',
          'Partial': 'Partial',
          '': '',
        },
      },
      placeholders: {

      },
      hints: {

      },
      new: {
        title: 'New Refund',
      },
      view: {
        title: 'View Refund',
      },
      importer: {
        title: 'Import Refunds',
        fileName: 'refund_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    transaction: {
      name: 'transaction',
      label: 'Transactions',
      menu: 'Transactions',
      exporterFileName: 'transaction_export',
      list: {
        menu: 'Transactions',
        title: 'Transactions',
      },
      create: {
        success: 'Transaction successfully saved',
      },
      update: {
        success: 'Transaction successfully saved',
      },
      destroy: {
        success: 'Transaction successfully deleted',
      },
      destroyAll: {
        success: 'Transaction(s) successfully deleted',
      },
      edit: {
        title: 'Edit Transaction',
      },
      fields: {
        id: 'Id',
        'status': 'Status',
        'paymentMethod': 'PaymentMethod',
        'amountRange': 'Amount',
        'amount': 'Amount',
        'customer': 'Customer',
        'reference': 'Reference',
        'currency': 'Currency',
        'paymentType': 'PaymentType',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        'status': {
          'Successful': 'Successful',
          'Failed': 'Failed',
          'Pending': 'Pending',
          'Abandoned': 'Abandoned',
          'Reversed': 'Reversed',
          '': '',
        },
        'paymentType': {
          'Product': 'Product',
          'Payment Link': 'Payment Link',
          'Invoice': 'Invoice',
        },
      },
      placeholders: {

      },
      hints: {

      },
      new: {
        title: 'New Transaction',
      },
      view: {
        title: 'View Transaction',
      },
      importer: {
        title: 'Import Transactions',
        fileName: 'transaction_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },
    category: {
      name: 'category',
      label: 'Categories',
      menu: 'Categories',
      exporterFileName: 'category_export',
      list: {
        menu: 'Categories',
        title: 'Categories',
      },
      create: {
        success: 'Category successfully saved',
      },
      update: {
        success: 'Category successfully saved',
      },
      destroy: {
        success: 'Category successfully deleted',
      },
      destroyAll: {
        success: 'Category(s) successfully deleted',
      },
      edit: {
        title: 'Edit Category',
      },
      fields: {
        id: 'Id',
        'categoryName': 'Category Name',
        'types': 'Types',
        'active': 'Active',
        'colorCode': 'ColorCode',
        'thumnail': 'Thumnail',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        'types': {
          'Store': 'Store',
          'Employee': 'Employee',

        },
      },
      placeholders: {

      },
      hints: {

      },
      new: {
        title: 'New Category',
      },
      view: {
        title: 'View Category',
      },
      importer: {
        title: 'Import Categories',
        fileName: 'category_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    locations: {
      name: 'locations',
      label: 'Locations',
      menu: 'Locations',
      exporterFileName: 'locations_export',
      list: {
        menu: 'Locations',
        title: 'Locations',
      },
      create: {
        success: 'Locations successfully saved',
      },
      update: {
        success: 'Locations successfully saved',
      },
      destroy: {
        success: 'Locations successfully deleted',
      },
      destroyAll: {
        success: 'Locations(s) successfully deleted',
      },
      edit: {
        title: 'Edit Locations',
      },
      fields: {
        id: 'Id',
        'city': 'City',
        'state': 'State',
        'country': 'Country',
        'streetAddress': 'Street Address',
        'type': 'Type',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        'type': {
          'Location': 'Location',
          'Address': 'Address',
        },
      },
      placeholders: {

      },
      hints: {

      },
      new: {
        title: 'New Locations',
      },
      view: {
        title: 'View Locations',
      },
      importer: {
        title: 'Import Locations',
        fileName: 'locations_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    business: {
        name: 'business',
        label: 'Businesses',
        menu: 'Businesses',
        exporterFileName: 'business_export',
        list: {
          menu: 'Businesses',
          title: 'Businesses',
        },
        create: {
          success: 'Business successfully saved',
        },
        update: {
          success: 'Business successfully saved',
        },
        destroy: {
          success: 'Business successfully deleted',
        },
        destroyAll: {
          success: 'Business(s) successfully deleted',
        },
        edit: {
          title: 'Edit Business',
        },
        fields: {
          id: 'Id',
          'fullname': 'Full Name',
          'businessName': 'Business Name',
          'email': 'Email',
          'country': 'Country',
          'password': 'Password',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Business',
        },
        view: {
          title: 'View Business',
        },
        importer: {
          title: 'Import Businesses',
          fileName: 'business_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    customer: {
        name: 'customer',
        label: 'Customers',
        menu: 'Customers',
        exporterFileName: 'customer_export',
        list: {
          menu: 'Customers',
          title: 'Customers',
        },
        create: {
          success: 'Customer successfully saved',
        },
        update: {
          success: 'Customer successfully saved',
        },
        destroy: {
          success: 'Customer successfully deleted',
        },
        destroyAll: {
          success: 'Customer(s) successfully deleted',
        },
        edit: {
          title: 'Edit Customer',
        },
        fields: {
          id: 'Id',
          'fullname': 'Full Name',
          'email': 'Email',
          'telephone': 'Telephone',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Customer',
        },
        view: {
          title: 'View Customer',
        },
        importer: {
          title: 'Import Customers',
          fileName: 'customer_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    store: {
        name: 'store',
        label: 'Stores',
        menu: 'Stores',
        exporterFileName: 'store_export',
        list: {
          menu: 'Stores',
          title: 'Stores',
        },
        create: {
          success: 'Store successfully saved',
        },
        update: {
          success: 'Store successfully saved',
        },
        destroy: {
          success: 'Store successfully deleted',
        },
        destroyAll: {
          success: 'Store(s) successfully deleted',
        },
        edit: {
          title: 'Edit Store',
        },
        fields: {
          id: 'Id',
          'storename': 'Store Name',
          'storedescription': 'Store Description',
          'storeImage': 'StoreImage',
          'storeURL': 'StoreURL',
          'storeCategory': 'StoreCategory',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {
          'storeCategory': {
            'Arts and Crafts': 'Arts and Crafts',
            'Baby Shop': 'Baby Shop',
            'Beauty and Skincare': 'Beauty and Skincare',
            'Book Shop': 'Book Shop',
            'Building and Construction': 'Building and Construction',
            'Education': 'Education',
            'Electronics': 'Electronics',
            'Gaming': 'Gaming',
            'Groceries': 'Groceries',
            'Gym and Fitness': 'Gym and Fitness',
            'Health Center': 'Health Center',
            'Insurance': 'Insurance',
            'Organization': 'Organization',
            'Restaurant': 'Restaurant',
            'Supermarket': 'Supermarket',
            'Others': 'Others',
          },
        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Store',
        },
        view: {
          title: 'View Store',
        },
        importer: {
          title: 'Import Stores',
          fileName: 'store_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    shipping: {
        name: 'shipping',
        label: 'Shippings',
        menu: 'Shippings',
        exporterFileName: 'shipping_export',
        list: {
          menu: 'Shippings',
          title: 'Shippings',
        },
        create: {
          success: 'Shipping successfully saved',
        },
        update: {
          success: 'Shipping successfully saved',
        },
        destroy: {
          success: 'Shipping successfully deleted',
        },
        destroyAll: {
          success: 'Shipping(s) successfully deleted',
        },
        edit: {
          title: 'Edit Shipping',
        },
        fields: {
          id: 'Id',
          'region': 'Region',
          'currency': 'Currency',
          'priceRange': 'Price',
          'price': 'Price',
          'store': 'Store',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Shipping',
        },
        view: {
          title: 'View Shipping',
        },
        importer: {
          title: 'Import Shippings',
          fileName: 'shipping_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    productCategory: {
        name: 'productCategory',
        label: 'ProductCategories',
        menu: 'ProductCategories',
        exporterFileName: 'productCategory_export',
        list: {
          menu: 'ProductCategories',
          title: 'ProductCategories',
        },
        create: {
          success: 'ProductCategory successfully saved',
        },
        update: {
          success: 'ProductCategory successfully saved',
        },
        destroy: {
          success: 'ProductCategory successfully deleted',
        },
        destroyAll: {
          success: 'ProductCategory(s) successfully deleted',
        },
        edit: {
          title: 'Edit ProductCategory',
        },
        fields: {
          id: 'Id',
          'category': 'Category',
          'description': 'Description',
          'store': 'Store',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New ProductCategory',
        },
        view: {
          title: 'View ProductCategory',
        },
        importer: {
          title: 'Import ProductCategories',
          fileName: 'productCategory_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    product: {
        name: 'product',
        label: 'Products',
        menu: 'Products',
        exporterFileName: 'product_export',
        list: {
          menu: 'Products',
          title: 'Products',
        },
        create: {
          success: 'Product successfully saved',
        },
        update: {
          success: 'Product successfully saved',
        },
        destroy: {
          success: 'Product successfully deleted',
        },
        destroyAll: {
          success: 'Product(s) successfully deleted',
        },
        edit: {
          title: 'Edit Product',
        },
        fields: {
          id: 'Id',
          'productName': 'ProductName',
          'productDescription': 'ProductDescription',
          'priceRange': 'Price',
          'price': 'Price',
          'sellingPriceRange': 'SellingPrice',
          'sellingPrice': 'SellingPrice',
          'stockUnitRange': 'StockUnit',
          'stockUnit': 'StockUnit',
          'category': 'Category',
          'productImages': 'ProductImages',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Product',
        },
        view: {
          title: 'View Product',
        },
        importer: {
          title: 'Import Products',
          fileName: 'product_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    productOptions: {
        name: 'productOptions',
        label: 'ProductOptions',
        menu: 'ProductOptions',
        exporterFileName: 'productOptions_export',
        list: {
          menu: 'ProductOptions',
          title: 'ProductOptions',
        },
        create: {
          success: 'ProductOptions successfully saved',
        },
        update: {
          success: 'ProductOptions successfully saved',
        },
        destroy: {
          success: 'ProductOptions successfully deleted',
        },
        destroyAll: {
          success: 'ProductOptions(s) successfully deleted',
        },
        edit: {
          title: 'Edit ProductOptions',
        },
        fields: {
          id: 'Id',
          'optionTitle': 'OptionTitle',
          'optionDescription': 'OptionDescription',
          'product': 'Product',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New ProductOptions',
        },
        view: {
          title: 'View ProductOptions',
        },
        importer: {
          title: 'Import ProductOptions',
          fileName: 'productOptions_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    paymentLink: {
        name: 'payment Link',
        label: 'Payment Link',
        menu: 'Payment Link',
        exporterFileName: 'paymentLink_export',
        list: {
          menu: 'Payment Links',
          title: 'Payment Links',
        },
        create: {
          success: 'Payment Link successfully saved',
        },
        update: {
          success: 'Payment Link successfully saved',
        },
        destroy: {
          success: 'Payment Link successfully deleted',
        },
        destroyAll: {
          success: 'Payment Link(s) successfully deleted',
        },
        edit: {
          title: 'Edit Payment Link',
        },
        fields: {
          id: 'Id',
          'paymentLinkName': 'Name',
          'currency': 'Currency',
          'amountRange': 'Amount',
          'amount': 'Amount',
          'description': 'Description',
          'customurl': 'Link',
          'redirecturl': 'Redirect Url',
          'typePaymentLink': 'Type',
          'interval': 'Interval',
          'Currency':'Currency',
          'numberOfTimeRange': 'Number Of Time',
          'numberOfTime': 'Number Of Time',
          'donationWebsite': 'Donation Website',
          'donationTelephone': 'Donation Telephone',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {
          'typePaymentLink': {
            'Single': 'Single',
            'Subscription': 'Subscription',
            'Donation': 'Donation',
          },
          'interval': {
            'Hourly': 'Hourly',
            'Daily': 'Daily',
            'Weekly': 'Weekly',
            'Monthly': 'Monthly',
            'Quarterly': 'Quarterly',
            'Every 6 month': 'Every 6 month',
            'Yearly': 'Yearly',
          },
          'currency': {
            'USD': 'USD',
            'SLSH': 'SLSH',
          },
        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Payment Link',
        },
        view: {
          title: 'View Payment Link',
        },
        importer: {
          title: 'Import Payment Links',
          fileName: 'payment Link_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    invoice: {
        name: 'invoice',
        label: 'Invoices',
        menu: 'Invoices',
        exporterFileName: 'invoice_export',
        list: {
          menu: 'Invoices',
          title: 'Invoices',
        },
        create: {
          success: 'Invoice successfully saved',
        },
        update: {
          success: 'Invoice successfully saved',
        },
        destroy: {
          success: 'Invoice successfully deleted',
        },
        destroyAll: {
          success: 'Invoice(s) successfully deleted',
        },
        edit: {
          title: 'Edit Invoice',
        },
        fields: {
          id: 'Id',
          'customer': 'Customer',
          'dueDateRange': 'Due Date',
          'dueDate': 'Due Date',
          'currency': 'Currency',
          'invoiceNote': 'InvoiceNote',
          'totalAmount':'Total Amount',
          'grantTotal':'Grant Total',
          'shippingFeeRange': 'ShippingFee',
          'shippingFee': 'ShippingFee',
          'discountRange': 'Discount',
          'discount': 'Discount',
          'taxRange': 'Tax',
          'tax': 'Tax',
          'otherEmails': 'OtherEmails',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Invoice',
        },
        view: {
          title: 'View Invoice',
        },
        importer: {
          title: 'Import Invoices',
          fileName: 'invoice_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    invoiceItems: {
        name: 'invoiceItems',
        label: 'InvoiceItems',
        menu: 'InvoiceItems',
        exporterFileName: 'invoiceItems_export',
        list: {
          menu: 'InvoiceItems',
          title: 'InvoiceItems',
        },
        create: {
          success: 'InvoiceItems successfully saved',
        },
        update: {
          success: 'InvoiceItems successfully saved',
        },
        destroy: {
          success: 'InvoiceItems successfully deleted',
        },
        destroyAll: {
          success: 'InvoiceItems(s) successfully deleted',
        },
        edit: {
          title: 'Edit InvoiceItems',
        },
        fields: {
          id: 'Id',
          'invoice': 'Invoice',
          'item': 'Item',
          'quantityRange': 'Quantity',
          'quantity': 'Quantity',
          'unitPriceRange': 'UnitPrice',
          'unitPrice': 'UnitPrice',
          'totalAmountRange': 'TotalAmount',
          'totalAmount': 'TotalAmount',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New InvoiceItems',
        },
        view: {
          title: 'View InvoiceItems',
        },
        importer: {
          title: 'Import InvoiceItems',
          fileName: 'invoiceItems_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    banks: {
        name: 'banks',
        label: 'Banks',
        menu: 'Banks',
        exporterFileName: 'banks_export',
        list: {
          menu: 'Banks',
          title: 'Banks',
        },
        create: {
          success: 'Banks successfully saved',
        },
        update: {
          success: 'Banks successfully saved',
        },
        destroy: {
          success: 'Banks successfully deleted',
        },
        destroyAll: {
          success: 'Banks(s) successfully deleted',
        },
        edit: {
          title: 'Edit Banks',
        },
        fields: {
          id: 'Id',
          'bankname': 'Bankname',
          'banktelephone': 'Banktelephone',
          'bankemail': 'Bankemail',
          'bankaddress': 'Bankaddress',
          'keys': 'Keys',
          'bankTypes': 'BankTypes',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {
          'bankTypes': {
            'Marchent': 'Marchent',
            'Bank': 'Bank',
          },
        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Banks',
        },
        view: {
          title: 'View Banks',
        },
        importer: {
          title: 'Import Banks',
          fileName: 'banks_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    businessAccounts: {
        name: 'Merchant',
        label: 'Merchant',
        menu: 'Merchant',
        exporterFileName: 'businessAccounts_export',
        list: {
          menu: 'Merchant',
          title: 'Merchant',
        },
        create: {
          success: 'Merchant successfully saved',
        },
        update: {
          success: 'Merchant successfully saved',
        },
        destroy: {
          success: 'Merchant successfully deleted',
        },
        destroyAll: {
          success: 'Merchant(s) successfully deleted',
        },
        edit: {
          title: 'Edit Merchant',
        },
        fields: {
          id: 'Id',
          'bankType': 'Bank Type',
          'accountName': 'Account Name',
          'accountNumber': 'Account Number',
          'telephone': 'Telephone',
          'currency': 'Currency',
          'isPrimary': 'Is Primary',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Merchant',
        },
        view: {
          title: 'View Merchant',
        },
        importer: {
          title: 'Import Merchant',
          fileName: 'businessAccounts_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    businessDocuments: {
        name: 'businessDocuments',
        label: 'BusinessDocuments',
        menu: 'BusinessDocuments',
        exporterFileName: 'businessDocuments_export',
        list: {
          menu: 'BusinessDocuments',
          title: 'BusinessDocuments',
        },
        create: {
          success: 'BusinessDocuments successfully saved',
        },
        update: {
          success: 'BusinessDocuments successfully saved',
        },
        destroy: {
          success: 'BusinessDocuments successfully deleted',
        },
        destroyAll: {
          success: 'BusinessDocuments(s) successfully deleted',
        },
        edit: {
          title: 'Edit BusinessDocuments',
        },
        fields: {
          id: 'Id',
          'type': 'Type',
          'document': 'Document',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {
          'type': {
            'Driver Licence': 'Driver Licence',
            'Nation ID Card': 'Nation ID Card',
            'International Passport': 'International Passport',
          },
        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New BusinessDocuments',
        },
        view: {
          title: 'View BusinessDocuments',
        },
        importer: {
          title: 'Import BusinessDocuments',
          fileName: 'businessDocuments_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    currency: {
        name: 'currency',
        label: 'Currencies',
        menu: 'Currencies',
        exporterFileName: 'currency_export',
        list: {
          menu: 'Currencies',
          title: 'Currencies',
        },
        create: {
          success: 'Currency successfully saved',
        },
        update: {
          success: 'Currency successfully saved',
        },
        destroy: {
          success: 'Currency successfully deleted',
        },
        destroyAll: {
          success: 'Currency(s) successfully deleted',
        },
        edit: {
          title: 'Edit Currency',
        },
        fields: {
          id: 'Id',
          'currency': 'Currency',
          'currencyIso': 'CurrencyIso',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Currency',
        },
        view: {
          title: 'View Currency',
        },
        importer: {
          title: 'Import Currencies',
          fileName: 'currency_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    payment: {
        name: 'payment',
        label: 'Payments',
        menu: 'Payments',
        exporterFileName: 'payment_export',
        list: {
          menu: 'Payments',
          title: 'Payments',
        },
        create: {
          success: 'Payment successfully saved',
        },
        update: {
          success: 'Payment successfully saved',
        },
        destroy: {
          success: 'Payment successfully deleted',
        },
        destroyAll: {
          success: 'Payment(s) successfully deleted',
        },
        edit: {
          title: 'Edit Payment',
        },
        fields: {
          id: 'Id',
          'customer': 'Customer',
          'paymentType': 'PaymentType',
          'product': 'Product',
          'paymentLink': 'PaymentLink',
          'invoice': 'Invoice',
          'paymentMethod': 'PaymentMethod',
          'amountRange': 'Amount',
          'amount': 'Amount',
          'paid': 'Paid',
          'currency': 'Currency',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {
          'paymentType': {
            'Product': 'Product',
            'PaymentLink': 'PaymentLink',
            'Invoice': 'Invoice',
          },
        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Payment',
        },
        view: {
          title: 'View Payment',
        },
        importer: {
          title: 'Import Payments',
          fileName: 'payment_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    paymentMethod: {
        name: 'paymentMethod',
        label: 'PaymentMethods',
        menu: 'PaymentMethods',
        exporterFileName: 'paymentMethod_export',
        list: {
          menu: 'PaymentMethods',
          title: 'PaymentMethods',
        },
        create: {
          success: 'PaymentMethod successfully saved',
        },
        update: {
          success: 'PaymentMethod successfully saved',
        },
        destroy: {
          success: 'PaymentMethod successfully deleted',
        },
        destroyAll: {
          success: 'PaymentMethod(s) successfully deleted',
        },
        edit: {
          title: 'Edit PaymentMethod',
        },
        fields: {
          id: 'Id',
          'bankTypes': 'BankTypes',
          'paymentMethodName': 'PaymentMethodName',
          'paymentMethodKey': 'PaymentMethodKey',
          'paymentMethodDescription': 'PaymentMethodDescription',
          'paymentMethodLogo': 'PaymentMethodLogo',
          'paymentMethodThumbnail': 'PaymentMethodThumbnail',
          'paymentMethodActive': 'PaymentMethodActive',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New PaymentMethod',
        },
        view: {
          title: 'View PaymentMethod',
        },
        importer: {
          title: 'Import PaymentMethods',
          fileName: 'paymentMethod_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },

    withdraw: {
        name: 'withdraw',
        label: 'Withdraws',
        menu: 'Withdraws',
        exporterFileName: 'withdraw_export',
        list: {
          menu: 'Withdraws',
          title: 'Withdraws',
        },
        create: {
          success: 'Withdraw successfully saved',
        },
        update: {
          success: 'Withdraw successfully saved',
        },
        destroy: {
          success: 'Withdraw successfully deleted',
        },
        destroyAll: {
          success: 'Withdraw(s) successfully deleted',
        },
        edit: {
          title: 'Edit Withdraw',
        },
        fields: {
          id: 'Id',
          'bankAccount': 'BankAccount',
          'amountRange': 'Amount',
          'amount': 'Amount',
          'description': 'Description',
          'paidRange': 'Paid',
          'paid': 'Paid',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          createdAtRange: 'Created at',
        },
        enumerators: {

        },
        placeholders: {

        },
        hints: {

        },
        new: {
          title: 'New Withdraw',
        },
        view: {
          title: 'View Withdraw',
        },
        importer: {
          title: 'Import Withdraws',
          fileName: 'withdraw_import_template',
          hint:
            'Files/Images columns must be the URLs of the files separated by space.',
        },
      },
  },

  auth: {
    tenants: 'Workspaces',
    profile: {
      title: 'Profile',
      success: 'Profile successfully updated',
    },
    createAnAccount: 'Create an account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',
    signin: 'Sign in',
    signup: 'Sign up',
    signout: 'Sign out',
    alreadyHaveAnAccount:
      'Already have an account? Sign in.',
    social: {
      errors: {
        'auth-invalid-provider':
          'This email is already registered to another provider.',
        'auth-no-email': `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount:
      'Sign in with another account',
    passwordChange: {
      title: 'Change Password',
      success: 'Password successfully changed',
      mustMatch: 'Passwords must match',
    },
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: 'Send password reset email',
      error: `Email not recognized`,
    },
    passwordReset: {
      message: 'Reset password',
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email successfully sent`,
    passwordResetEmailSuccess: `Password reset email successfully sent`,
    passwordResetSuccess: `Password successfully changed`,
    verifyEmail: {
      success: 'Email successfully verified.',
      message:
        'Just a moment, your email is being verified...',
    },
  },

  tenant: {
    name: 'tenant',
    label: 'Workspaces',
    menu: 'Workspaces',
    list: {
      menu: 'Workspaces',
      title: 'Workspaces',
    },
    create: {
      button: 'Create Workspace',
      success: 'Workspace successfully saved',
    },
    update: {
      success: 'Workspace successfully saved',
    },
    destroy: {
      success: 'Workspace successfully deleted',
    },
    destroyAll: {
      success: 'Workspace(s) successfully deleted',
    },
    edit: {
      title: 'Edit Workspace',
    },
    fields: {
      id: 'Id',
      name: 'Name',
      url: 'URL',
      tenantName: 'Workspace Name',
      tenantId: 'Workspace',
      tenantUrl: 'Workspace URL',
      plan: 'Plan',
    },
    enumerators: {},
    new: {
      title: 'New Workspace',
    },
    invitation: {
      view: 'View Invitations',
      invited: 'Invited',
      accept: 'Accept Invitation',
      decline: 'Decline Invitation',
      declined: 'Invitation successfully declined',
      acceptWrongEmail: 'Accept Invitation With This Email',
    },
    select: 'Select Workspace',
    validation: {
      url:
        'Your workspace URL can only contain lowercase letters, numbers and dashes (and must start with a letter or number).',
    },
  },

  roles: {
    admin: {
      label: 'Admin',
      description: 'Full access to all resources',
    },
    custom: {
      label: 'Custom Role',
      description: 'Custom access to resources',
    },
  },
  admin: {
    invite: 'Invite',
    title: 'Admin',
    menu: 'Admin',
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      phoneNumber: 'Phone Number',
      role: 'Role',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      rememberMe: 'Remember me',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      newPasswordConfirmation: 'New Password Confirmation',
    },
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    disable: 'Disable',
    enable: 'Enable',
    doAddSuccess: 'User(s) successfully saved',
    doUpdateSuccess: 'User successfully saved',
    status: {
      active: 'Active',
      invited: 'Invited',
      'empty-permissions': 'Waiting for Permissions',
    },
    exporterFileName: 'users_export',
    doDestroySuccess: 'User successfully deleted',
    doDestroyAllSelectedSuccess:
      'User(s) successfully deleted',
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'New User(s)',
      titleModal: 'New User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint:
        'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      disablingHimself: `You can't disable yourself`,
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },

  user: {
    invite: 'Invite',
    title: 'Users',
    menu: 'Users',
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      phoneNumber: 'Phone Number',
      role: 'Role',
      country:'Country',
      businessName:'Business Name',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      rememberMe: 'Remember me',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      newPasswordConfirmation: 'New Password Confirmation',
    },
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    disable: 'Disable',
    enable: 'Enable',
    doAddSuccess: 'User(s) successfully saved',
    doUpdateSuccess: 'User successfully saved',
    status: {
      active: 'Active',
      invited: 'Invited',
      'empty-permissions': 'Waiting for Permissions',
    },
    exporterFileName: 'users_export',
    doDestroySuccess: 'User successfully deleted',
    doDestroyAllSelectedSuccess:
      'User(s) successfully deleted',
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'New User(s)',
      titleModal: 'New User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint:
        'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      disablingHimself: `You can't disable yourself`,
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },

  plan: {
    menu: 'Plans',
    title: 'Plans',

    free: {
      label: 'Free',
      price: '$0',
    },
    growth: {
      label: 'Growth',
      price: '$10',
    },
    enterprise: {
      label: 'Enterprise',
      price: '$50',
    },

    pricingPeriod: '/month',
    current: 'Current Plan',
    subscribe: 'Subscribe',
    manage: 'Manage Subscription',
    cancelAtPeriodEnd:
      'This plan will be canceled at the end of the period.',
    somethingWrong:
      'There is something wrong with your subscription. Please go to manage subscription for more details.',
    notPlanUser: `You are not the manager of this subscription.`,
  },

  auditLog: {
    menu: 'Audit Logs',
    title: 'Audit Logs',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separate multiple entities using the comma character.',
    fields: {
      id: 'Id',
      timestampRange: 'Period',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      action: 'Action',
      values: 'Values',
      timestamp: 'Date',
      createdByEmail: 'User Email',
    },
  },
  settings: {
    title: 'Settings',
    menu: 'Settings',
    save: {
      success:
        'Settings successfully saved. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      theme: 'Theme',
      logos: 'Logo',
      backgroundImages: 'Background Image',
    },
    colors: {
      default: 'Default',
      cyan: 'Cyan',
      'geek-blue': 'Geek Blue',
      gold: 'Gold',
      lime: 'Lime',
      magenta: 'Magenta',
      orange: 'Orange',
      'polar-green': 'Polar Green',
      purple: 'Purple',
      red: 'Red',
      volcano: 'Volcano',
      yellow: 'Yellow',
    },
  },
  dashboard: {
    menu: 'Dashboard',
    message: `This page uses fake data for demonstration purposes only. You can edit it at frontend/view/dashboard/DashboardPage.ts.`,
    charts: {
      day: 'Day',
      red: 'Red',
      green: 'Green',
      yellow: 'Yellow',
      grey: 'Grey',
      blue: 'Blue',
      orange: 'Orange',
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
      },
      eating: 'Eating',
      drinking: 'Drinking',
      sleeping: 'Sleeping',
      designing: 'Designing',
      coding: 'Coding',
      cycling: 'Cycling',
      running: 'Running',
      customer: 'Customer',
    },
  },
  errors: {
    backToHome: 'Back to home',
    403: `Sorry, you don't have access to this page`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    429: 'Too many requests. Please try again later.',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },
  
  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} is invalid',
      required: '${path} is required',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min:
        '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} is required`
          : `${path} field must have at least ${min} items`,
      max:
        '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be one of: {0}.`,
  },
  importer: {
    line: 'Line',
    status: 'Status',
    pending: 'Pending',
    imported: 'Imported',
    error: 'Error',
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      'Do not navigate away from this page or import will be stopped.',
    completed: {
      success:
        'Import completed. All rows were successfully imported.',
      someErrors:
        'Processing completed, but some rows were unable to be imported.',
      allErrors: 'Import failed. There are no valid rows.',
    },
    form: {
      downloadTemplate: 'Download the template',
      hint:
        'Click or drag the file to this area to continue',
    },
    list: {
      discardConfirm:
        'Are you sure? Non-imported data will be lost.',
    },
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  autocomplete: {
    loading: 'Loading...',
  },

  imagesViewer: {
    noImage: 'No image',
  },
};

export default en;
