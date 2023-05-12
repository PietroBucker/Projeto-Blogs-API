/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns 
 */

const PostCategorieModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
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
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId', // se refere ao id de User na tabela de `blog_posts`
      otherKey: 'categoryId',
    })

    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId', // se refere ao id de User na tabela de `categories`
      otherKey: 'postId',
    });

  }
  return PostCategory;
};

module.exports = PostCategorieModel;