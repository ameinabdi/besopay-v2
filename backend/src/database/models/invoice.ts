import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const invoice = sequelize.define(
    'invoice',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('dueDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('dueDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      invoiceNote: {
        type: DataTypes.TEXT,
      },
      shippingFee: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      discount: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      tax: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      totalAmount: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      grantTotal: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      otherEmails: {
        type: DataTypes.TEXT,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  invoice.associate = (models) => {
    models.invoice.belongsToMany(models.customer, {
      as: 'customer',
      constraints: false,
      through: 'invoiceCustomerCustomer',
    });
    models.invoice.belongsTo(models.currency, {
      as: 'currency',
      constraints: false,
    });
    models.invoice.hasMany(models.invoiceItems, {
      as: 'Items',
      foreignKey: 'invoiceId',
      constraints: false,
    });

    models.invoice.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.invoice.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.invoice.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return invoice;
}
