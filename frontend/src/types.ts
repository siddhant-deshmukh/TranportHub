export interface IUser {
  _id: string,
  name: string,
  email: string,
  user_type: 'manufacturer' | 'transporter',
  address: string,
}
export interface IOrder { 
  _id: string,
  title?: string,
  order_id: string,
  manufacturer_id: string,
  transporter_id?: string,
  to: string,
  from: string, 
  address: string,
  quantity: number,
  unit: 'ton',
  price?: number,
  last_activity : Date,
  status : 'proposed' | 'accepted' | 'cancelled',
}
export interface IMsg {
  _id: string,
  time: Date,
  text: string,
  Order_Id: string,
  author_id: string,
}