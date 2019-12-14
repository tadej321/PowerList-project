const mongo = require('mongoose');

exports.connect = (uri) => {
    return new Promise((resolve, reject) => {
        mongo.connect(uri, {useNewUrlParser: true})
            .then((result, err) => {
                if (err) return reject(err);
                resolve();
            });
    });
};

exports.close = () => {
    return mongo.disconnect();
};


