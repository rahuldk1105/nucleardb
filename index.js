(function ($) {
    "use strict";

    /*==================================================================
    [ Focus input on blur ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        });
    });

    /*==================================================================
    [ Survey Form Validation ]*/
    var input = $('.validate-input .input100');
    var fileInput = $('.validate-input .input-file');  // For file input

    $('.survey-form').on('submit', function () {
        var check = true;

        // Validate all inputs
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        // Validate file inputs (if necessary)
        if (check) {
            check = validateFile(fileInput);
        }

        return check;
    });

    // Focus event to hide error on focus
    $('.survey-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    // Function to validate input fields
    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else if ($(input).attr('type') == 'number') {
            if ($(input).val().trim() == "" || isNaN($(input).val().trim())) {
                return false;
            }
        } else if ($(input).val().trim() == '') {
            return false;
        }
        return true;
    }

    // Function to validate file input fields (e.g., uploaded documents)
    function validateFile(input) {
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if ($(input[i]).get(0).files.length === 0) { // No file selected
                showValidate(input[i]);
                check = false;
            }
        }
        return check;
    }

    // Show validation error message
    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    // Hide validation error message
    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);
