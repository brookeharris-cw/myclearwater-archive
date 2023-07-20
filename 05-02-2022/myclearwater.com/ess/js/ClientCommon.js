//This fie contains common code for client-side DOM manipulation, validation, etc. 
//Anything that needs to be done in the client without a Server request that may be used in multiple places can go here. 

//All code should be placed inside the clientCommon object, this provides a namespace for all of these common methods.
var clientCommon = {
    validators: {
        //The root level of validators has common validation that can be used in all areas of ESS
        //All validators return true if the passed string is valid, false otherwise.

        email: function(s) { return s ? s.length > 1 && s.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/) : false; },
        //Verifies that a string is a valid email address.  Supports all possible email address types.
          
        zipCode: function (s) {
            if (s) {
                return (s.length == 5 && !s.match(/[^0-9]/)) || (s.length == 10 && !s.match(/[^0-9-]/));
            }
            else {
                return false;
            }
        },
        //Verifies that a string is a valid zip code.  Can be 5 digit or 9 digit with dash e.g. 04215 or 04215-1419

        applicants: {
            //this contains validators that are specific to applicant areas in ESS

            username: function (s) { return s ? s.length >= 1 && s.length < 63 && s.match(/[a-z]/i) && !s.match(/[^a-z0-9._\-@]/i) : false; },
            //Applicant usernames must be 1-63 characters long (ApplicantPasswords.ApplicantUsername is a varchar(62)), have at least one letter, and only contain letters, numbers, and . or _ 

            password: function (s) { return  s ? s.length >= 4 && !s.match(/\s/) : false; },
            //validator for a single entry password

            passwords: function (p, c) { return (p && c) ? p == c && p.length >= 4 && !p.match(/\s/) : false; },
            //validator for two passwords (enter twice to confirm) 
            //Applicant password entry just uses very simple validation on the client side.  
            //ASP validators actually verify passwords against site-defined requirements when a request is sent to the server.
            //this just checks that password length >= 4 and that two passwords match and there is no whitespace

            name: function (s) { return s ? s.length >= 1 && !s.match(/[^a-z0-9'.,\-\s]/i) : false; },
            //For names (first and last) - can only contain letters, numbers spaces, apostrophe, and [.,-] period or comma or hyphen.

            pin: function (s) { return s ? s.length >= 1 && !s.match(/[^0-9]/) : false; },
            //PIN numbers for migrating users to user/pass login- can only contain numbers
            
            securityAnswer: function (s) { return s ? s.length >= 1 && !s.match(/[^a-z0-9\s]/i) : false; },
            //Answers to security questions for applicants- can only contain letters, numbers, and spaces.  No Symbols.

            verifyEmailCode: function (s) { return s ? s.length == 8 && !s.match(/[^a-z0-9]/i) : false; }
            //Email verification code is an 8-digit alphanumeric string 

        } 

    }
};