/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns 
 */

const PostCategorieModel = (sequelize, DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {
    postId: {
      type: DataTypes.INTEGER, 
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER, 
      primaryKey: true
    },
  },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    },
  );
  PostCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategorie,
      foreignKey: 'categoryId', // se refere ao id de User na tabela de `categories`
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'postId', // se refere ao id de User na tabela de `blog_posts`
      otherKey: 'categoryId',
    })
  }
  return PostCategorie;
};

module.exports = PostCategorieModel;