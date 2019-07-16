import validator from 'validator';

class tripValidator{
    createTrip(req, res, next){

    const {origin, destination, fare} = req.body;
    const catchErrors = {};
    if(origin == undefined || destination == undefined || fare == undefined){
        return res.status(422).json({status:'Failed', message:'All or some fields are empty'});
    }
    
    if(validator.isAlphanumeric(origin)){
        if(validator.isEmpty(origin)){
        catchErrors.origin = 'Field cannot be empty';
        }   
    }else{
        catchErrors.origin = 'Fields should contain alphabets and numbers';
        }
    if(validator.isAlphanumeric(destination)){
        if(validator.isEmpty(destination)){
        catchErrors.destination = 'Field cannot be empty';
        }   
    }else{
            catchErrors.destination = 'Fields should contain alphabets and numbers';
        }        
    if(validator.isEmpty(fare)){
        catchErrors.fare = 'Field cannot be empty';
        }
    if(validator.isAlpha(fare)){
        catchErrors.fare = 'Field Should only contain numbers';
        }
    if(Object.keys(catchErrors).length != 0){
        return res.status(400).json({catchErrors});
    }
    next();
}
    createBus(req, res, next){
        const {number_plate, manufacturer, model, year, capacity} = req.body;
        const catchErrors = {};
        if(number_plate == undefined || manufacturer == undefined || model == undefined || year == undefined || capacity == undefined){
            return res.status(422).json({status:'Failed', message:'All or some fields are empty'});
        }
        if(validator.isAlphanumeric(number_plate)){
            if(validator.isEmpty(number_plate)){
            catchErrors.number_plate = 'Field cannot be empty';
            }   
        }else{
            catchErrors.number_plate = 'Fields should contain alphabets and numbers';
            }
        if(validator.isAlphanumeric(manufacturer)){
            if(validator.isEmpty(manufacturer)){
            catchErrors.manufacturer = 'Field cannot be empty';
            }   
        }else{
                catchErrors.manufacturer = 'Fields should contain alphabets and numbers';
            }
        if(validator.isAlphanumeric(model)){
            if(validator.isEmpty(model)){
            catchErrors.model = 'Field cannot be empty';
            }   
        }else{
                catchErrors.model = 'Fields should contain alphabets and numbers';
            }             
        if(validator.isEmpty(year)){
            catchErrors.year = 'Field cannot be empty';
            }
        if(validator.isAlpha(year)){
            catchErrors.year = 'Field Should only contain numbers';
            }
        if(validator.isEmpty(capacity)){
            catchErrors.capacity = 'Field cannot be empty';
            }
        if(validator.isAlpha(capacity)){
            catchErrors.capacity = 'Field Should only contain numbers';
            }
        if(Object.keys(catchErrors).length != 0){
            return res.status(400).json({catchErrors});
        }
        next(); 
    }
}

export default new tripValidator();