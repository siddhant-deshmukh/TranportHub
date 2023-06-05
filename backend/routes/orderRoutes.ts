import auth from '../middleware/auth'
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express'
import User, { IUserCreate, IUserStored } from '../models/users';
import Order, { IOrderCreate } from '../models/order';
import { body } from 'express-validator';
import validate from '../middleware/validate';
import { addMsg } from './msgRoutes';

dotenv.config();
var router = express.Router();

router.get('/', auth, async (req, res) => {
  try {

    const { skip , limit} = req.query
    let skipNum = (skip && typeof skip === 'string' && parseInt(skip) && parseInt(skip) > 0)?parseInt(skip):0
    let limitDocs = (limit && typeof limit === 'string' && parseInt(limit) && parseInt(limit) > 1 )?parseInt(limit):5

    if (res.user.user_type === 'manufacturer') {
      const orders = await Order.find({manufacturer_id : res.user._id})
        .sort({'last_activity':-1})
        .skip(skipNum)
        .limit(limitDocs)
      return res.status(200).json({orders})
    } else {
      const orders = await Order.find({transporter_id : res.user._id})
        .sort({'last_activity':-1})
        .skip(skipNum)
        .limit(limitDocs)
      return res.status(200).json({orders}) 
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Some internal error occured', err })
  }
})

router.post('/', auth,
  body('order_id').isString().trim().exists().isLength({max:5, min:1}).exists(),
  body('title').optional().isString().isLength({ max: 100, min: 1 }).trim(),
  body('to').isString().isLength({ max: 100, min: 1 }).trim().exists(),
  body('from').isString().isLength({ max: 100, min: 1 }).trim().exists(),
  body('address').isString().isLength({ max: 200, min: 1 }).trim().exists(),
  body('transporter_id').isString().trim().exists(),
  body('quantity').isNumeric().exists(),
  body('unit').isString().isIn(['ton']).exists(),
  body('price').optional().isNumeric(),
  validate,
  async (req, res) => {
    try {
      if (res.user.user_type === 'transporter')
        return res.status(405).json({ msg: 'transporter not allowed to create order' });

      const { title, to, from, address, quantity, unit, price, transporter_id, order_id } : IOrderCreate = req.body

      const check_transporter = await User.findById(transporter_id)
      if (!check_transporter)
        return res.status(404).json({ msg: 'transporter not found' });
      const check_order_id = await Order.find({order_id})
      if(check_order_id.length > 0){
        return res.status(409).json({ msg: 'order_id already used' });
      }

      const order = await Order.create({
        title,
        to,
        from,
        address,
        quantity,
        unit,
        price,
        transporter_id,
        manufacturer_id: res.user._id,
        order_id,
        status: 'proposed',
      })
      return res.status(201).json({ msg: 'Successfull', order })
    } catch (err) {
      return res.status(500).json({ msg: 'Some internal error occured', err })
    }
  })
router.get('/:_id', auth, async (req, res) => {
  try {
    const _id = req.params['_id']
    if (!_id) return res.status(400).json({ msg: 'order id required' })
    const check_order = await Order.findById(_id)
    if (!check_order) return res.status(404).json({ msg: 'order not found' })

    if (check_order.manufacturer_id.toString() != res.user._id.toString() && check_order.transporter_id?.toString() != res.user._id.toString())
      return res.status(401).json({ msg: 'Not allowed' });

    return res.status(200).json({ msg: 'Successfull', order: check_order });
  } catch (err) {
    return res.status(500).json({ msg: 'Some internal error occured', err })
  }
})

router.put('/:_id',
  body('title').isString().isLength({ max: 100, min: 1 }).trim().optional(),
  body('to').isString().isLength({ max: 100, min: 1 }).trim().optional(),
  body('from').isString().isLength({ max: 100, min: 1 }).trim().optional(),
  body('address').isString().isLength({ max: 200, min: 1 }).trim().optional(),
  body('quantity').isNumeric().optional(),
  body('price').isNumeric().optional(),
  body('unit').isString().isIn(['ton']).optional(),
  validate,
  auth, async (req, res) => {
    try {
      const _id = req.params['_id']
      if (!_id) return res.status(400).json({ msg: 'order id required' })
      
      const check_order = await Order.findById(_id)
      if (!check_order) return res.status(404).json({ msg: 'order not found' })
      if (check_order.manufacturer_id.toString() != res.user._id.toString() && check_order.transporter_id?.toString() != res.user._id.toString())
      return res.status(401).json({ msg: 'Not allowed' });

      const { title, to, from, address, quantity, unit, price } = req.body
      if (res.user.user_type === 'transporter'){
        if(title || to || from || address || quantity || unit)
          return res.status(405).json({ msg: 'Transporter can only change price of order' });
      } else {
        if(price)
          return res.status(405).json({ msg: 'Manufacturer can not edit price of order' });
      }

      await Order.findByIdAndUpdate(_id,{
        title, 
        to, 
        from,
        address, 
        quantity, 
        unit, 
        price,
        last_activity : new Date()
      })

      const text = `${res.user.name} changed ${(quantity)?'quantity':''})  ${(address)?'address':''}) ${(unit)?'unit':''}) ${(to | from) ?'some data':''}) `
      addMsg(_id,res.user._id,text)

      return res.status(200).json({ msg: 'Successfull'});
    } catch (err) {
      return res.status(500).json({ msg: 'Some internal error occured', err })
    }
  })
router.delete('/:_id', auth, (req, res) => {

})

export default router