import auth from '../middleware/auth'
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express'
import User, { IUserCreate, IUserStored } from '../models/users';
import { Types } from 'mongoose';
import Order from '../models/order';
import Msg from '../models/msg';
import { body } from 'express-validator';
import validate from '../middleware/validate';

dotenv.config();
var router = express.Router();

router.get('/:order_id', auth, async (req, res) => {
  try {
    const order_id = req.params['order_id']
    if (!order_id) return res.status(400).json({ msg: 'order id required' })

    const check_order = await Order.findById(order_id)
    if (!check_order) return res.status(404).json({ msg: 'order not found' })

    if (check_order.manufacturer_id.toString() != res.user._id.toString() && check_order.transporter_id?.toString() != res.user._id.toString())
      return res.status(401).json({ msg: 'Not allowed' });

    const { skip, limit } = req.query
    let skipNum = (skip && typeof skip === 'string' && parseInt(skip) && parseInt(skip) > 0) ? parseInt(skip) : 0
    let limitDocs = (limit && typeof limit === 'string' && parseInt(limit) && parseInt(limit) > 1) ? parseInt(limit) : 5

    const msgs = await Msg.find({ order_id: new Types.ObjectId(order_id) })
      .sort({ 'time': -1 })
      .skip(skipNum)
      .limit(limitDocs)
    return res.status(200).json({ msgs })
  } catch (err) {
    return res.status(500).json({ msg: 'Some internal error occured', err })
  }
})
router.post('/:order_id',
  body('text').isString().isLength({ max: 400, min: 1 }).trim().exists(),
  validate,
  auth, async (req, res) => {
    try {
      const order_id = req.params['order_id']
      if (!order_id) return res.status(400).json({ msg: 'order id required' })

      const check_order = await Order.findById(order_id)
      if (!check_order) return res.status(404).json({ msg: 'order not found' })

      if (check_order.manufacturer_id.toString() != res.user._id.toString() && check_order.transporter_id?.toString() != res.user._id.toString())
        return res.status(401).json({ msg: 'Not allowed' });

      const { text } = req.body

      const msg = await addMsg(order_id, res.user._id, text)

      return res.status(200).json({ msg })
    } catch (err) {
      return res.status(500).json({ msg: 'Some internal error occured', err })
    }
  })

export async function addMsg(order_id: Types.ObjectId | string, author_id: Types.ObjectId, text: string) {
  const msg = await Msg.create({
    text,
    author_id,
    order_id 
  })
  return msg
}
