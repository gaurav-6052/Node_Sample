var _ = require('lodash');
var util = require('util');
var errStackParser = require('error-stack-parser');
var errors = {};
module.exports = errors;
/**
 * Adds useful methods to errors. Use this to create new type of errors.
 * @param {Number} httpCode - HTTP response code.
 * @param {Number} errorCode - error code.
 * @param {String} description - error description.
 * @param {*} stackFrames - error stack frames.
 */
function ApiError(httpCode, errorCode, description, stackFrames) {
    this.httpCode = httpCode;
    this.errorCode = errorCode;
    this.description = description;
    this.details = null;
    this.stackFrames = stackFrames;
}
util.inherits(ApiError, Error);
// expose constructor
errors.ApiError = ApiError;
/**
 * sets arbitrary details object to error.
 * @param {Object} detail - detail object.
 * @return error.
 */
ApiError.prototype.withDetails = function (details) {
    this.details = details;
    return this;
};
/**
 * sends error as JSON via express response. Sets appropriate HTTP status as well.
 * @param {Object} response - express response.
 */
ApiError.prototype.sendTo = function (response) {
    response.status(this.httpCode);
    response.json({ errorCode: this.errorCode, description: this.description, details: this.details });
};
/**
 * Genreates a function to create ApiError when called.
 * @param {Number} httpCode - HTTP response code.
 * @param {Number} errorCode - error code.
 * @param {String} description - error description.
 */
function create(httpCode, errorCode, description) {
    return function () {
        // create error stack frames (drop the first one for this function call)
        var stackFrames = _.drop(errStackParser.parse(new Error(errorCode)), 1);

        // filter out node's internal and node_module file links
        stackFrames = stackFrames.filter(function (sf) {
            return _.startsWith(sf.fileName, '/') && sf.fileName.indexOf('node_modules') < 0;
        });
        // return a new error instance, with error stack trace
        return new ApiError(httpCode, errorCode, description, stackFrames);
    };
}
//--------------------- GENERIC ERRORS -------------------------/
errors.internal_error = create(500, 'INTERNAL_ERROR',
    'Something went wrong on server. Please contact server admin.');
errors.invalid_key = create(401, 'INVALID_KEY',
    'Valid api key is required. Please provide a valid api key along with request.');
errors.invalid_auth = create(401, 'INVALID_AUTH',
    'Valid auth token is required. Please provide a valid auth token along with request.');
errors.invalid_permission = create(401, 'INVALID_PERMISSION',
    'Permission denied. Current user does not has required permissions for this resource.');
errors.invalid_access = create(401, 'INVALID_ACCESS',
    'Access denied. Current user does not has access for this resource.');
// errors.invalid_input = create(400, 'INVALID_INPUT',
// 'The request input is not as expected by API. Please provide valid input.');
errors.invalid_input = create(400, 'INVALID_INPUT',
    'The provided input is not as expected. Please provide valid input.');
errors.invalid_id = create(400, 'INVALID_INPUT',
    'The provided id is not exist.');
errors.invalid_email = create(400, 'INVALID_INPUT',
    'Invalid email address or password, please try with valid email or password.');
errors.invalid_emailAddress = create(400, 'INVALID_INPUT',
    'Invalid email address or user_type. Please provide valid input.');
errors.invalid_user = create(400, 'INVALID_INPUT',
    'user email is not valid, for any query contact system admin.');
errors.invalid_password = create(400, 'INVALID_INPUT',
    'wrong old password');
errors.invalid_old_password = create(400, 'INVALID_INPUT',
    'invalid old password, please try with a valid password.');
errors.input_too_large = create(400, 'INPUT_TOO_LARGE',
    'The request input size is larger than allowed.');
errors.invalid_input_format = create(400, 'INVALID_INPUT_FORMAT',
    'The request input format is not allowed.');
errors.invalid_operation = create(403, 'INVALID_OPERATION',
    'Requested operation is not allowed due to applied rules. Please refer to error details.');
errors.not_found = create(404, 'NOT_FOUND',
    'The resource referenced by request does not exists.');

//--------------------- BUSINESS LOGIC ERRORS ---------------------------/
errors.invalid_login = create(400, 'INVALID_LOGIN',
    'Login credentials do not match any registered user.');
errors.invalid_directory = create(400, 'INVALID_Directory',
    'The provided Directory is not as valid. Please provide valid input.');
errors.account_disabled = create(403, 'ACCOUNT_DISABLED',
    'User account has been disabled.');
errors.already_registered = create(400, 'ALREADY_REGISTERED',
    'A user with simillar idenitifiers is already registered.');
errors.email_already_registered = create(400, 'EMAIL_ALREADY_REGISTERED',
    'A user with simillar email is already registered.');
errors.phone_already_registered = create(400, 'PHONE_ALREADY_REGISTERED',
    'A user with simillar phone is already registered.');
errors.email_verification_required = create(403, 'EMAIL_VERIFICATION_REQUIRED',
    'To proceed with the request, email verification is required first.');
errors.phone_verification_required = create(403, 'PHONE_VERIFICATION_REQUIRED',
    'To proceed with the request, phone verification is required first.');
errors.recp_account_disabled = create(403, 'RECP_ACCOUNT_DISABLED',
    'Receipient user account has been disabled.');
errors.invalid_masterdata_type = create(403, 'INVALID_MASTERDATA_TYPE',
    'Master data type are not exist. First create master data type');
errors.invalid_old_password = create(403, 'INVALID_OLD_PASSWORD',
    'Invalid old password');
errors.invalid_emailAddress = create(403, 'INVALID_EMAIL_ADDRESS',
    'provided email not exists in the system.');
errors.invalid_transaction_status = create(403, 'INVALID_TRANSACTION_STATUS',
    'Transaction status is not valid.');
errors.time_out = create(403, 'TIME_OUT',
    'Server not responding, please try again.');  
    errors.invalid_update = create(403, 'update Failed',
    'Server not responding, please try again.');  	
	
