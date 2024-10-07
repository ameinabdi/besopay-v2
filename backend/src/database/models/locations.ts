import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const locations = sequelize.define(
    'locations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      state: {
        type: DataTypes.TEXT,
      },
      country: {
        type: DataTypes.TEXT,
      },
      streetAddress: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "Location",
            "Address"
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

  locations.associate = (models) => {



    
    models.locations.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.locations.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.locations.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return locations;
}
