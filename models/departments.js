const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      departments.belongsToMany(models.users, {
        foreignKey: 'department_id',
        through: 'user_department',
        as: 'users',
      });
      departments.belongsTo(models.companies, {
        foreignKey: 'company_id',
        as: 'companies',
      });
      departments.hasMany(models.CS_numbers, {
        foreignKey: 'department_id',
        as: 'CS_numbers',
      });
      departments.hasMany(models.services, {
        foreignKey: 'department_id',
        as: 'services',
      });
    }
  }
  departments.init({
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: { model: 'companies', key: 'id' },
      onDelete: 'CASCADE',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'departments',
  });
  return departments;
};
