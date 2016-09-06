/**
 * CarsController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	test: function (req, res) {

    let car = {
      name: 'Chevrolet',
      whereFrom: 'America',
      driver: {
        name: 'Sherlock Holmes',
        whereFrom: 'England',
        year: 1980,
      },
    };

    Cars.create(car).exec((error, createdCar) => {
      res.send({input: car, output: createdCar });
    });
  }
};

