import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const transaction = sequelize.define(
    'transaction',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      paymentType: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "Product",
            "Payment Link",
            "Invoice"
          ]],
        }
      },
      status: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "Successful",
            "Failed",
            "Pending",
            "Abandoned",
            "Reversed",
            ""
          ]],
        }
      },
      amount: {
        type: DataTypes.DECIMAL(24, 3),
        validate: {
        }
      },
      reference: {
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

  transaction.associate = (models) => {
    models.transaction.belongsTo(models.paymentMethod, {
      as: 'paymentMethod',
      constraints: false,
    });


    models.transaction.hasMany(models.transactionLog, {
      as: 'transactionLog',
      foreignKey: 'transactionId',
      constraints: false,
    });

    models.transaction.belongsTo(models.customer, {
      as: 'customer',
      constraints: false,
    });

    models.transaction.belongsTo(models.currency, {
      as: 'currency',
      constraints: false,
    });

    models.transaction.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.transaction.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.transaction.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return transaction;
}
