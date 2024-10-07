import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const productCategory = sequelize.define(
    'productCategory',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      category: {
        type: DataTypes.TEXT,
      },
      description: {
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

  productCategory.associate = (models) => {
    models.productCategory.belongsTo(models.store, {
      as: 'store',
      constraints: false,
    });


    
    models.productCategory.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.productCategory.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.productCategory.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return productCategory;
}
