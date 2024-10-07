import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const paymentLink = sequelize.define(
    'paymentLink',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      paymentLinkName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      amount: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      description: {
        type: DataTypes.TEXT,
      },
      customurl: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      redirecturl: {
        type: DataTypes.TEXT,
      },
      typePaymentLink: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "Single",
            "Subscription",
            "Donation"
          ]],
        }
      },
      interval: {
        type: DataTypes.TEXT,
        validate: {
          isIn: [[
            "Hourly",
            "Daily",
            "Weekly",
            "Monthly",
            "Quarterly",
            "Every 6 month",
            "Yearly"
          ]],
        }
      },
      numberOfTime: {
        type: DataTypes.INTEGER,
      },
      donationWebsite: {
        type: DataTypes.TEXT,
      },
      donationTelephone: {
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

  paymentLink.associate = (models) => {

    models.paymentLink.belongsTo(models.currency, {
      as: 'currency',
      foreignKey: {
        allowNull: false,
      },
    });
    models.paymentLink.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.paymentLink.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.paymentLink.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return paymentLink;
}
