import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const shipping = sequelize.define(
    'shipping',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      region: {
        type: DataTypes.TEXT,
      },
      currency: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
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

  shipping.associate = (models) => {
    models.shipping.belongsTo(models.store, {
      as: 'store',
      constraints: false,
    });


    
    models.shipping.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.shipping.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.shipping.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return shipping;
}
