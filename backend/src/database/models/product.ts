import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const product = sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      productName: {
        type: DataTypes.TEXT,
      },
      productDescription: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      sellingPrice: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      stockUnit: {
        type: DataTypes.INTEGER,
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

  product.associate = (models) => {
    models.product.belongsTo(models.productCategory, {
      as: 'category',
      constraints: false,
    });

    models.product.hasMany(models.file, {
      as: 'productImages',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.product.getTableName(),
        belongsToColumn: 'productImages',
      },
    });
    
    models.product.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.product.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.product.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return product;
}
