
$(document).ready(()=> {

    $("#slick").ddslick({
        width: "33%",
        imagePosition: "left",
    });

    $("#shippingCountry").msDropdown();

    $('#firstname, #lastname, #email, #mobile, #addressLine1, #postcode, #city').change(()=>{
        const errElementSelctor = '#' + $(this).attr('id') + 'Error';
        $(errElementSelctor).hide();
    });

    $("form").submit(event=> {
        event.preventDefault()
        
        const formData = {
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
            beforeSend: ()=> {
                $(".error-display").hide();
            },
            success: data => {
                    $("#registrationForm")[0].reset();
                    alert("customer data stored successfully");
                    return true
            },
            error: data => {
                    const errorData = JSON.parse(data.responseText); 
                    let errElementSelctor = '';
                    if(errorData.field){    // Displays the field duplicate error if email or phone number are already present in DB
                        errElementSelctor = '#' + errorData.field + 'Error'
                        if (errorData.field === 'email' || errorData.field === 'mobile') {
                            $(errElementSelctor).show();
                            $(errElementSelctor).html(errorData.error);    
                        }
                        return false
                    }else{              
                            errorData.forEach(error => { // Displays validation error returned from server 
                            errElementSelctor = '#' + error.param + 'Error'
                            $(errElementSelctor).show();
                            $(errElementSelctor).html(error.msg);
                        })
                        return false;
                    }
                }
        });
    });
})