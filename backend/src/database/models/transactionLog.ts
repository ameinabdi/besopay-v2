export default function (sequelize, DataTypes) {
    const transactionLog = sequelize.define(
      'transactionLog',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        timestamp: { type: DataTypes.DATE, allowNull: false },
        values: { type: DataTypes.JSON, allowNull: false },
      },
      {
        timestamps: false,
      },
    );
  
    transactionLog.associate = (models) => {
      models.transactionLog.belongsTo(models.transaction, {
        as: 'transaction',
        foreignKey: {
          allowNull: false,
        },
      });
      models.transactionLog.belongsTo(models.tenant, {
        as: 'tenant',
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    return transactionLog;
  }
  