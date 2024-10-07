import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const withdraw = sequelize.define(
    'withdraw',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL(24, 4),
        validate: {

        }
      },
      description: {
        type: DataTypes.TEXT,
      },
      paid: {
        type: DataTypes.DATE,
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

  withdraw.associate = (models) => {
    models.withdraw.belongsTo(models.businessAccounts, {
      as: 'bankAccount',
      constraints: false,
    });


    
    models.withdraw.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.withdraw.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.withdraw.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return withdraw;
}
