import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const currency = sequelize.define(
    'currency',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      currency: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      currencyIso: {
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

  currency.associate = (models) => {



    
    models.currency.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.currency.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.currency.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return currency;
}
