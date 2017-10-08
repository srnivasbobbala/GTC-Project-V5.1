var doAjax = function (Url, Type, Data, ContentType, DataType, preLoader, getBack) {
    $.ajax({
        url: Url,
        type: Type,
        data: JSON.stringify(Data),
        contentType: ContentType,
        dataType: DataType,
        beforeSend: function () { if (preLoader) $('.' + preLoader).css("display", 'block'); },
        complete: function () { if (preLoader) $('.' + preLoader).css("display", 'none') },
        success: function (Response) {
            getBack(null, Response);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            getBack({ Status: 0, InfoOpts: 501, Data: {} });
        }
    });
}

$(document).on("click", "#loginUser", function () {
    UserLogin();
});

function UserLogin() {

    EmailId = document.getElementById('usrname').value;
    Password = document.getElementById('psw').value;

    if (EmailId == "") {
        $('#fail-msg').text('Enter Email Id')
        $("#fail-msg-div").hide().show('medium');
        $("#fail-msg-div").delay(1000).fadeOut();
    } else {
        if (Password == "") {
            $('#fail-msg').text('Enter Password')
            $("#fail-msg-div").hide().show('medium');
            $("#fail-msg-div").delay(1000).fadeOut();
        } else {
            //$('#loginUser').prop('disabled', true);
            var LoginUser_Details = {
                "EmailID": EmailId,
                "Password": Password,
            };

            doAjax('/api/Login/', 'Post', LoginUser_Details, 'application/json', "json", '', function (err, result) {
                if (err) {
                    //console.log(err);
                } else {
                    console.log(result);
                    if (result.ResponseId == 1) {

                        var User_Session_Details = {
                            "ProfileId": result.Result["ProfileId"],
                            "EmailId": result.Result["EmailId"],
                            "UserName": result.Result["DisplayName"],
                            "ActiveIndicator": result.Result["ActiveIndicator"]

                        };
                        console.log(User_Session_Details);

                        $('#success-msg').text('Login Success');
                        $("#success-msg-div").hide().show('medium');
                        $("#success-msg-div").delay(1000).fadeOut();
                        window.location.href = "/src/index.html";
                    }
                    else {
                        $('#fail-msg').text('Please provide valid credentials');
                        $("#fail-msg-div").hide().show('medium');
                        $("#fail-msg-div").delay(1000).fadeOut();
                    }

                }

            });
        }
    }
}