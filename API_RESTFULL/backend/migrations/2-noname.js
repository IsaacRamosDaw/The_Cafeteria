'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "orderId" on table "orderLines"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2025-02-06T16:15:34.058Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "changeColumn",
        params: [
            "orderLines",
            "orderId",
            {
                "type": Sequelize.INTEGER,
                "field": "orderId",
                "onUpdate": "CASCADE",
                "onDelete": "cascade",
                "references": {
                    "model": "Orders",
                    "key": "id"
                },
                "allowNull": true
            },
            {
                transaction: transaction
            }
        ]
    }];
};
var rollbackCommands = function(transaction) {
    return [{
        fn: "changeColumn",
        params: [
            "orderLines",
            "orderId",
            {
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
            {
                transaction: transaction
            }
        ]
    }];
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
