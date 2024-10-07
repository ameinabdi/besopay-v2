import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const payment = sequelize.define(
    'payment',
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
      amount: {
        type: DataTypes.DECIMAL(24, 4),
        validate: {

        }
      },
      status: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "Pending",
            "Paid",
            "Refund"
          ]],
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

  payment.associate = (models) => {
    models.payment.belongsTo(models.customer, {
      as: 'customer',
      constraints: false,
    });

    models.payment.belongsTo(models.product, {
      as: 'product',
      constraints: false,
    });

    models.payment.belongsTo(models.paymentLink, {
      as: 'paymentLink',
      constraints: false,
    });

    models.payment.belongsTo(models.invoice, {
      as: 'invoice',
      constraints: false,
    });

    models.payment.belongsTo(models.paymentMethod, {
      as: 'paymentMethod',
      constraints: false,
    });

    models.payment.belongsTo(models.currency, {
      as: 'currency',
      constraints: false,
    });


    
    models.payment.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.payment.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.payment.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return payment;
}
