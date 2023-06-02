import mongoose, { Types } from "mongoose";



export interface IOrderCreate {
  title?: string,
  order_id: string,
  manufacturer_id: Types.ObjectId,
  transporter_id?: Types.ObjectId,
  to: string,
  from: string,
  address: string,
  quantity: number,
  unit: 'ton',
  price?: number,
  last_activity : Date,
  status : 'proposed' | 'accepted' | 'cancelled',
}

export interface IOrderStored extends IOrderCreate {
  _id: Types.ObjectId,
}

const orderSchema = new mongoose.Schema<IOrderStored>({
  title : {type: String, maxlength:100},
  order_id : {type: String, index:true, required:true},
  manufacturer_id : {type: mongoose.SchemaTypes.ObjectId, index:true, required:true},
  transporter_id : {type: mongoose.SchemaTypes.ObjectId, index:true, required:true},
  last_activity : {type: Date, index:true, default: new Date()},

  to : {type: String, required:true, maxlength:100},
  from : {type: String, required:true, maxlength:100},
  address : {type: String, required:true, maxlength:200},
  quantity : {type: Number, required:true},
  unit : {type: String, enum:['ton'],required:true},
  price : {type: Number, required:true},
  status : {type: String, enum:['proposed','accepted','cancelled'],required:true},
})

const Order = mongoose.model<IOrderStored>("Order", orderSchema);
export default Order;