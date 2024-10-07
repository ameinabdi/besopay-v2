import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const store = sequelize.define(
    'store',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      storename: {
        type: DataTypes.TEXT,
      },
      storedescription: {
        type: DataTypes.TEXT,
      },
      storeURL: {
        type: DataTypes.TEXT,
      },
      storeCategory: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "Arts and Crafts",
            "Baby Shop",
            "Beauty and Skincare",
            "Book Shop",
            "Building and Construction",
            "Education",
            "Electronics",
            "Gaming",
            "Groceries",
            "Gym and Fitness",
            "Health Center",
            "Insurance",
            "Organization",
            "Restaurant",
            "Supermarket",
            "Others"
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

  store.associate = (models) => {


    models.store.hasMany(models.file, {
      as: 'storeImage',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.store.getTableName(),
        belongsToColumn: 'storeImage',
      },
    });
    
    models.store.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.store.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.store.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return store;
}
