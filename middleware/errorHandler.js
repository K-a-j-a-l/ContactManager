const { constants } = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch (statuscode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack })
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack })
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack })
            break;
        case constants.UNAUTHORISED:
            res.json({ title: "Authorization Failed", message: err.message, stackTrace: err.stack })
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Internal Server Error", message: err.message, stackTrace: err.stack })
            break;
        default:
            console.log("No Error")
            break;
    }

}

module.exports = errorHandler