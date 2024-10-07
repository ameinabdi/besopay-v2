import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const paymentMethod = sequelize.define(
    'paymentMethod',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      paymentMethodName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      paymentMethodKey: {
        type: DataTypes.TEXT,
      },
      paymentMethodDescription: {
        type: DataTypes.TEXT,
      },
      paymentMethodActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

  paymentMethod.associate = (models) => {
    models.paymentMethod.belongsTo(models.banks, {
      as: 'bankTypes',
      constraints: false,
    });

    models.paymentMethod.hasMany(models.file, {
      as: 'paymentMethodLogo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.paymentMethod.getTableName(),
        belongsToColumn: 'paymentMethodLogo',
      },
    });

    models.paymentMethod.hasMany(models.file, {
      as: 'paymentMethodThumbnail',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.paymentMethod.getTableName(),
        belongsToColumn: 'paymentMethodThumbnail',
      },
    });
    
    models.paymentMethod.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.paymentMethod.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.paymentMethod.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return paymentMethod;
}
