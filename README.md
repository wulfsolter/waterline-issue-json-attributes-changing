# waterline-issue-json-attributes-changing

a [Sails](http://sailsjs.org) application to reproduce waterline issue https://github.com/balderdashy/waterline/issues/1313

* `$ sails lift`
* visit `http://localhost:1337/cars/test`

Input does not match created output. `driver.whereFrom` became `driver.where_from` due to `columnName` transformation of `Cars.whereFrom`.

    {
      "input": {
        "name": "Chevrolet",
        "whereFrom": "America",
        "driver": {
          "name": "Sherlock Holmes",
          "whereFrom": "England",
          "year": 1980
        }
      },
      "output": {
        "name": "Chevrolet",
        "driver": {
          "name": "Sherlock Holmes",
          "year": 1980,
          "where_from": "England"
        },
        "createdAt": "2016-09-06T00:04:21.896Z",
        "updatedAt": "2016-09-06T00:04:21.896Z",
        "id": 9,
        "whereFrom": "America"
      }
    }

when all that has happened is

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

As Cars model has a root property called 'whereFrom', other JSON props which also contain the key 'whereFrom' get their key renamed.

Cars model:

    attributes: {
      name: {
        type:     'string',
      },

      whereFrom: {
        type:       'json',
        columnName: 'where_from',
      },

      driver: {
        type:     'json',
      },

    }

