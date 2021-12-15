const Prescription = require("../models/prescriptionModel");
const HttpError = require("../middlewares/HttpError");
//upload prescription services
const uploadPrescriptionServices = async(body)=>{
    const {prescriptionImage,_id} = body
    
    try {
        const prescription = new Prescription({prescriptionImage,owner:{_id}});
        await prescription.save();
        return {prescription};
    } catch (err) {
        console.log('err: ', err);
        const error = new HttpError(500, "something went wrong in uploadPrescription Services!");
        console.log('error: ', error);
    return { error };
    }
};

//all prescription services
const allPrescriptionService = async()=>{
    try {
        const allPrescription = await Prescription.find().populate("owner");
        if(allPrescription){
            return{allPrescription}
        }
        else{
            const error = new HttpError(404,"Sorry No prescripton yet");
        console.log('error: ', error)
        return {error}; 
        }
    } catch (err) {
        const error = new HttpError(404,"something went wrong in allPrescription Services!");
        console.log('error: ', error)
        return {error};
    }
};

//update Prescription
const updatePrescriptionServices = async(data1)=>{
    const {_id,data} = data1;
    try {
        const updatePrescription = await Prescription.findByIdAndUpdate({_id},{$set:data},{new:true});
        console.log('updatePrescription: ', updatePrescription);
        if(!updatePrescription){
            const error = new HttpError(404,"Sorry can't update Prescription !");
            console.log('error: ', error)
            return {error};
        }
        return {updatePrescription}
    } catch (err) {
        const error = new HttpError(500,"something went Wrong in update prescription  services");
        console.log('error: ', error);
        return {error} ;
    }
}
module.exports = {uploadPrescriptionServices,allPrescriptionService,updatePrescriptionServices};