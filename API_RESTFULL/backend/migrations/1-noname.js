'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Admins", deps: []
 * createTable "Courses", deps: []
 * createTable "Categories", deps: []
 * createTable "Inventories", deps: []
 * createTable "CoffeShops", deps: [Admins]
 * createTable "Students", deps: [Courses]
 * createTable "Wallets", deps: [Students]
 * createTable "Workers", deps: [CoffeShops]
 * createTable "Schools", deps: [CoffeShops]
 * createTable "Orders", deps: [Students]
 * createTable "Products", deps: [Categories, CoffeShops]
 * createTable "orderLines", deps: [Orders, Products]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2025-02-06T01:18:23.960Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "Admins",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "username": {
                        "type": Sequelize.STRING,
                        "field": "username",
                        "allowNull": false
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": false
                    },
                    "role": {
                        "type": Sequelize.STRING,
                        "field": "role",
                        "defaultValue": "admin",
                        "allowNull": false
                    },
                    "filename": {
                        "type": Sequelize.STRING,
                        "field": "filename"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Courses",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Categories",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Inventories",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name"
                    },
                    "quantity": {
                        "type": Sequelize.INTEGER,
                        "field": "quantity"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "CoffeShops",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "filename": {
                        "type": Sequelize.STRING,
                        "field": "filename"
                    },
                    "admin": {
                        "type": Sequelize.INTEGER,
                        "field": "admin",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Admins",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Students",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "username": {
                        "type": Sequelize.STRING,
                        "field": "username",
                        "allowNull": false
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": false
                    },
                    "role": {
                        "type": Sequelize.STRING,
                        "field": "role",
                        "defaultValue": "student",
                        "allowNull": false
                    },
                    "age": {
                        "type": Sequelize.INTEGER,
                        "field": "age",
                        "allowNull": false
                    },
                    "phone": {
                        "type": Sequelize.STRING,
                        "field": "phone",
                        "allowNull": true
                    },
                    "filename": {
                        "type": Sequelize.STRING,
                        "field": "filename"
                    },
                    "courseId": {
                        "type": Sequelize.INTEGER,
                        "field": "courseId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Courses",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Wallets",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "amount": {
                        "type": Sequelize.DECIMAL,
                        "field": "amount"
                    },
                    "studentId": {
                        "type": Sequelize.INTEGER,
                        "field": "studentId",
                        "onUpdate": "CASCADE",
                        "onDelete": "cascade",
                        "references": {
                            "model": "Students",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Workers",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "username": {
                        "type": Sequelize.STRING,
                        "field": "username",
                        "allowNull": false
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": false
                    },
                    "phone": {
                        "type": Sequelize.STRING,
                        "field": "phone",
                        "allowNull": false
                    },
                    "role": {
                        "type": Sequelize.STRING,
                        "field": "role",
                        "defaultValue": "worker",
                        "allowNull": false
                    },
                    "filename": {
                        "type": Sequelize.STRING,
                        "field": "filename"
                    },
                    "coffeShop": {
                        "type": Sequelize.INTEGER,
                        "field": "coffeShop",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "CoffeShops",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Schools",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "address": {
                        "type": Sequelize.STRING,
                        "field": "address",
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "allowNull": false
                    },
                    "phone": {
                        "type": Sequelize.STRING,
                        "field": "phone",
                        "allowNull": false
                    },
                    "filename": {
                        "type": Sequelize.STRING,
                        "field": "filename"
                    },
                    "coffeShop": {
                        "type": Sequelize.INTEGER,
                        "field": "coffeShop",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "CoffeShops",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Orders",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "date": {
                        "type": Sequelize.DATE,
                        "field": "date",
                        "allowNull": false
                    },
                    "status": {
                        "type": Sequelize.STRING,
                        "field": "status"
                    },
                    "studentId": {
                        "type": Sequelize.INTEGER,
                        "field": "studentId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Students",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Products",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description",
                        "defaultValue": "",
                        "allowNull": false
                    },
                    "price": {
                        "type": Sequelize.FLOAT,
                        "field": "price",
                        "defaultValue": 0,
                        "allowNull": false
                    },
                    "filename": {
                        "type": Sequelize.STRING,
                        "field": "filename"
                    },
                    "categoryId": {
                        "type": Sequelize.INTEGER,
                        "field": "categoryId",
                        "onUpdate": "CASCADE",
                        "onDelete": "cascade",
                        "references": {
                            "model": "Categories",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "coffeShop": {
                        "type": Sequelize.INTEGER,
                        "field": "coffeShop",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "CoffeShops",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "orderLines",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "quantity": {
                        "type": Sequelize.INTEGER,
                        "field": "quantity",
                        "allowNull": false
                    },
                    "unitPrice": {
                        "type": Sequelize.DECIMAL,
                        "field": "unitPrice"
                    },
                    "orderId": {
                        "type": Sequelize.INTEGER,
                        "field": "orderId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Orders",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "productId": {
                        "type": Sequelize.INTEGER,
                        "field": "productId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Products",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["Admins", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Workers", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Students", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Wallets", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Schools", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Courses", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Categories", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Products", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Orders", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["CoffeShops", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Inventories", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["orderLines", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
