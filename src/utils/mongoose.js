module.exports = {
    multipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map((array) => array.toObject());
    },
    mongooseToObject: function (array) {
        return array ? array.toObject() : array;
    },
};
