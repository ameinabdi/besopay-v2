import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const businessAccounts = sequelize.define(
    'businessAccounts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      accountName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      accountNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      telephone: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      isPrimary: {
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

  businessAccounts.associate = (models) => {
    models.businessAccounts.belongsTo(models.banks, {
      as: 'bankType',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.businessAccounts.belongsTo(models.currency, {
      as: 'currency',
      constraints: false,
    });


    
    models.businessAccounts.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.businessAccounts.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.businessAccounts.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return businessAccounts;
}
