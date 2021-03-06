/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _this = this;

$(document).ready(function () {
  $("#slick").ddslick({
    imagePosition: "left"
  });
  $("#shippingCountry").msDropdown();
  $('#firstname, #lastname, #email, #mobile, #addressLine1, #postcode, #city').change(function () {
    var errElementSelctor = '#' + $(_this).attr('id') + 'Error';
    $(errElementSelctor).hide();
  });
  $("form").submit(function (event) {
    event.preventDefault();
    var formData = {
      firstname: $('#firstname').val(),
      lastname: $('#lastname').val(),
      email: $('#email').val(),
      shippingCountry: $('#shippingCountry').val(),
      mobile: $('#mobile').val(),
      addressLine1: $('#addressLine1').val(),
      addressLine2: $("addressLine2").val(),
      postcode: $('#postcode').val(),
      city: $('#city').val()
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/shippingForm",
      data: JSON.stringify(formData),
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      beforeSend: function beforeSend() {
        $(".error-display").hide();
      },
      success: function success(data) {
        $("#registrationForm")[0].reset();
        alert("customer data stored successfully");
        return true;
      },
      error: function error(data) {
        var errorData = JSON.parse(data.responseText);
        var errElementSelctor = '';

        if (errorData.field) {
          // Displays the field duplicate error if email or phone number are already present in DB
          errElementSelctor = '#' + errorData.field + 'Error';

          if (errorData.field === 'email' || errorData.field === 'mobile') {
            $(errElementSelctor).show();
            $(errElementSelctor).html(errorData.error);
          }

          return false;
        } else {
          errorData.forEach(function (error) {
            // Displays validation error returned from server 
            errElementSelctor = '#' + error.param + 'Error';
            $(errElementSelctor).show();
            $(errElementSelctor).html(error.msg);
          });
          return false;
        }
      }
    });
  });
});

/***/ })
/******/ ]);