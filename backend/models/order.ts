import mongoose, { Types } from "mongoose";

export interface IOrderStored {
  _id: Types.ObjectId,
  name?: string,
  manufacturer_id: Types.ObjectId,
  transporter_id?: Types.ObjectId,
  to: string,
  from: string,
  address: string,
  quantity: number,
  unit: 'ton',
  price?: number
}

export interface IOrderCreate {
  name?: string,
  manufacturer_id: Types.ObjectId,
  transporter_id?: Types.ObjectId,
  to: string,
  from: string,
  address: string,
  quantity: number,
  unit: 'ton',
  price?: number
}

const orderSchema = new mongoose.Schema<IOrderStored>({
  name : {type: String, maxlength:100},
  manufacturer_id : {type: mongoose.SchemaTypes.ObjectId, index:true},
  transporter_id : {type: mongoose.SchemaTypes.ObjectId, sparse:true},
  to : {type: String, required:true, maxlength:100},
  from : {type: String, required:true, maxlength:100},
  address : {type: String, required:true, maxlength:200},
  quantity : {type: Number, required:true},
  unit : {type: String, enum:['ton'],required:true},
  price : {type: Number, required:true},
})

const Order = mongoose.model<IOrderStored>("Order", orderSchema);
export default Order;