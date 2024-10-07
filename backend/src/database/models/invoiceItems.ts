import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const invoiceItems = sequelize.define(
    'invoiceItems',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      item: {
        type: DataTypes.TEXT,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      unitPrice: {
        type: DataTypes.DECIMAL,
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
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

  invoiceItems.associate = (models) => {
    models.invoiceItems.belongsTo(models.invoice, {
      as: 'invoice',
      constraints: false,
    });


    
    models.invoiceItems.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.invoiceItems.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.invoiceItems.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return invoiceItems;
}
