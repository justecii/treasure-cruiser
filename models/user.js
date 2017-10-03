'use strict';
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        profileName: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: "Profile Name must be between 1 and 99 characters"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password must be between 8 and 99 characters'
                }
            }
        }
    }, {
        hooks: {
            beforeCreate: function(createdUser, options, cb) {
                // hash the password
                var hash = bcrypt.hashSync(createdUser.password, 10);
                // store the hash as the user's password
                createdUser.password = hash;
                // continue to save the user, with no errors
                cb(null, createdUser);
            }
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        location: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        },

    });
    return user;
};