import mongoose, { Types } from "mongoose";


export interface IMsgCreate {
  time: Date,
  text: string,
  Order_Id: Types.ObjectId,
  author_id: Types.ObjectId,
}
export interface IMsgStored extends IMsgCreate {
  _id: Types.ObjectId,
}

const orderSchema = new mongoose.Schema<IMsgStored>({
  text : {type: String, maxlength:400},
  time : {type: Date, required:true, index:true, default : new Date()},
  author_id : {type: mongoose.SchemaTypes.ObjectId},
  Order_Id : {type: mongoose.SchemaTypes.ObjectId, index:true},
})

const Msg = mongoose.model<IMsgStored>("Msg", orderSchema);
export default Msg;