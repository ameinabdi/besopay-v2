import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const permission = sequelize.define(
    'permission',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      entity: {
        type: DataTypes.STRING(255),
        allowNull: true, 
      },
      add: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      edit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      list: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      view: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      trash: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      exportData: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      importData: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      search: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      print: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

  permission.associate = (models) => {
    models.permission.belongsTo(models.roles, {
      as: 'inRole',
      constraints: false,
    });
    models.permission.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: true,
      },
    });

    models.permission.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.permission.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return permission;
}
