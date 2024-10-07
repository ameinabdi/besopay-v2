import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const refund = sequelize.define(
    'refund',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      transactionAmound: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      refundType: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "Full",
            "Partial",
            ""
          ]],
        }
      },
      customerNote: {
        type: DataTypes.TEXT,
      },
      businessNote: {
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

  refund.associate = (models) => {
    models.refund.belongsTo(models.transaction, {
      as: 'transaction',
      constraints: false,
    });

    models.refund.belongsTo(models.customer, {
      as: 'customer',
      constraints: false,
    });


    
    models.refund.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.refund.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.refund.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return refund;
}
