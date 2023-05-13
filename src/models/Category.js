/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns 
 */

const CategorieModel = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  },
    {
      timestamps: false,
      table: 'categories',
      underscored: true,
    },
  );
  return Categorie;
};

module.exports = CategorieModel;