import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const banks = sequelize.define(
    'banks',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bankname: {
        type: DataTypes.TEXT,
      },
      banktelephone: {
        type: DataTypes.TEXT,
      },
      bankemail: {
        type: DataTypes.TEXT,
      },
      bankaddress: {
        type: DataTypes.TEXT,
      },
      keys: {
        type: DataTypes.TEXT,
      },
      bankTypes: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [[
            "Marchent",
            "Bank"
          ]],
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

  banks.associate = (models) => {



    
    models.banks.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.banks.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.banks.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return banks;
}
