const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({name: null})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Colombia' });
      });
    });
    describe('flag image', () => {
      it('should throw an error if flag image is null', async () => {
        Country.create({flag: null})
          .then(() => done(new Error('It requires a valid image url')))
          .catch(() => done());
      })
      it('should work when its a valid url', () => {
        Country.create({ flag: 'https://flagcdn.com/w320/is.png' });
      });
    })
    describe('continent', () => {
      it('should throw an error if continent is null', async () => {
        Country.create({continent: null})
          .then(() => done(new Error('It requires a valid continent')))
          .catch(() => done());
      })
      it('should work when its a valid capital', () => {
        Country.create({ continent: 'America' });
      });
    })
    describe('capital', () => {
      it('should throw an error if capital is null', async () => {
        Country.create({capital: null})
          .then(() => done(new Error('It requires a valid capital')))
          .catch(() => done());
      })
      it('should work when its a valid capital', () => {
        Country.create({ capital: 'Bogotá' });
      });
    })
  });
});
