import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class WordAntonym extends Model {
    static associate(models) {
      WordAntonym.belongsTo(models.Word, {
        foreignKey: "wordId",
        as: "word",
      });
    }
  }
  WordAntonym.init(
    {
      wordId: DataTypes.INTEGER,
      antonymId: DataTypes.INTEGER,
    },
    {
      underscored: true,
      sequelize,
      modelName: "WordAntonym",
    }
  );
  return WordAntonym;
};
