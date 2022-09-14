const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        isAlpha: true,
        longId (value) {
          if (value.length > 3) {
            throw new Error('Debe tener menos de tres caracteres');
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagImg: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
      defaultValue: ' '
    },
    area: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    population: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
};
