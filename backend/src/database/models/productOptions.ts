import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const productOptions = sequelize.define(
    'productOptions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      optionTitle: {
        type: DataTypes.TEXT,
      },
      optionDescription: {
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

  productOptions.associate = (models) => {
    models.productOptions.belongsTo(models.product, {
      as: 'product',
      constraints: false,
    });


    
    models.productOptions.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.productOptions.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.productOptions.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return productOptions;
}
