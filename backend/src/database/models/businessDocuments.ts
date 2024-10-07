import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const businessDocuments = sequelize.define(
    'businessDocuments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [[
            "Driver Licence",
            "Nation ID Card",
            "International Passport"
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

  businessDocuments.associate = (models) => {


    models.businessDocuments.hasMany(models.file, {
      as: 'document',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.businessDocuments.getTableName(),
        belongsToColumn: 'document',
      },
    });
    
    models.businessDocuments.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.businessDocuments.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.businessDocuments.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return businessDocuments;
}
