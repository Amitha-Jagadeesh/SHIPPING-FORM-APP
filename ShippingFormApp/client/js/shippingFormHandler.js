
$(document).ready(function () {

    $("#slick").ddslick({
        width: "33%",
        imagePosition: "left",
    })

    $("#shippingCountry").msDropdown();

    $('#firstname, #lastname, #email, #mobile, #addressLine1, #postcode, #city').change(function () {
        var errElementSelctor = '#' + $(this).attr('id') + 'Error';
        $(errElementSelctor).hide();
    });

    $("form").submit(function (event) {
        event.preventDefault()
        
        let formData = {
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            email: $('#email').val(),
            shippingCountry: $('#shippingCountry').val(),
            mobile: $('#mobile').val(),
            addressLine1: $('#addressLine1').val(),
            addressLine2: $("addressLine2").val(),
            postcode: $('#postcode').val(),
            city: $('#city').val()
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/shippingForm",
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            
            success: data => {
                    $("form").reset();
                    alert("customer data stored successfully");
                    return true
            },
            error: data => {
                    var errorData = JSON.parse(data.responseText);   
                    if(errorData.field){    // Displays the field duplicate error if email or phone number are already present in DB
                        var errElementSelctor = '#' + errorData.field + 'Error'
                        if (errorData.field === 'email' || errorData.field === 'mobile') {
                            $(errElementSelctor).show();
                            $(errElementSelctor).html(errorData.error);    
                        }
                        return false
                    }else{              
                        errorData.forEach(error => { // Displays validation error returned from server 
                            var errElementSelctor = '#' + error.param + 'Error'
                            $(errElementSelctor).show();
                            $(errElementSelctor).html(error.msg);
                        })
                        return false;
                    }
                }
        });
    });
})