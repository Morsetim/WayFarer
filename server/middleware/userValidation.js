import validator from 'validator';


class userValidator{
    signUp(req, res, next){

        const {firstName, lastName, email, password} = req.body;
        const catchErrors = {};

        if(firstName == undefined || lastName == undefined || email == undefined || password == undefined){
            return res.status(422).json({status:'Failed', message:'All or some fields are empty'});
        }
        if(validator.isAlpha(lastName)){
            catchErrors.lastName = 'Fields should contain alphabets';
        }
        if(validator.isAlpha(firstName)){
            catchErrors.firstName = 'Fields should contain alphabets';
        }
        if(!validator.isEmail(email)){
            catchErrors.email = 'Field must be an Email format';
        }
        if(validator.isEmpty(email)){
            catchErrors.email = 'Field must be an Email format';
        }
        if(validator.isAlphanumeric(password)){
            catchErrors.password = 'Fields can only contain alphabets';
        }
        if(!validator.isEmpty(password)){
            if(!validator.isLength(password, {min:6})){
                catchErrors.password = 'Password length must be at least six characters long';
            }
        }else{
            catchErrors.password = 'Field cannot be Empty';
        }
        if(Object.keys(catchErrors).length != 0){
            return res.status(400).json({catchErrors});
        }
        next();
}
signIn(req, res, next){
    const {email, password} = req.body;
    let signErrors = {};
    if(email == undefined || password == undefined){
    return res.status(422).json({status:'Failed', message:'All or some fields are empty'}); 
    }
    if(!validator.isEmail(email)){
        signErrors.email = 'Field must be an Email format';
    }

    if(!validator.isEmpty(password)){
        if(!validator.isLength(password, {min:6})){
            signErrors.password = 'Password length must be at least six characters long';
        }
    }else{
        signErrors.password = 'Field cannot be Empty';
    }
    if(Object.keys(signErrors).length != 0){
        return res.status(422).json({signErrors});
    }
    next();
}
}

export default new userValidator();
