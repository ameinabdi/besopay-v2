import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const roles = sequelize.define(
    'roles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      roles: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      permissions: {
        type: DataTypes.JSON,
      },
      assignToNewUser: {
        type: DataTypes.BOOLEAN,
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

  roles.associate = (models) => {
   
    models.roles.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: true,
      },
    });

    models.roles.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.roles.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return roles;
}
