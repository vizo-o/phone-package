"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = exports.Country = exports.normalizePhoneNumber = exports.isLandlineNumber = exports.detectLandline = exports.formatPhoneNumberForDisplay = exports.formatPhoneNumber = exports.detectCountryFromPhoneNumber = void 0;
var country_detection_1 = require("./country-detection");
Object.defineProperty(exports, "detectCountryFromPhoneNumber", { enumerable: true, get: function () { return country_detection_1.detectCountryFromPhoneNumber; } });
var formatting_1 = require("./formatting");
Object.defineProperty(exports, "formatPhoneNumber", { enumerable: true, get: function () { return formatting_1.formatPhoneNumber; } });
Object.defineProperty(exports, "formatPhoneNumberForDisplay", { enumerable: true, get: function () { return formatting_1.formatPhoneNumberForDisplay; } });
var landline_detection_1 = require("./landline-detection");
Object.defineProperty(exports, "detectLandline", { enumerable: true, get: function () { return landline_detection_1.detectLandline; } });
Object.defineProperty(exports, "isLandlineNumber", { enumerable: true, get: function () { return landline_detection_1.isLandlineNumber; } });
var normalization_1 = require("./normalization");
Object.defineProperty(exports, "normalizePhoneNumber", { enumerable: true, get: function () { return normalization_1.normalizePhoneNumber; } });
var types_1 = require("./types");
Object.defineProperty(exports, "Country", { enumerable: true, get: function () { return types_1.Country; } });
var validation_1 = require("./validation");
Object.defineProperty(exports, "validatePhoneNumber", { enumerable: true, get: function () { return validation_1.validatePhoneNumber; } });
//# sourceMappingURL=index.js.map