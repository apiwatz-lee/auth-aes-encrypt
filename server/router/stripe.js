import Stripe from 'stripe'
import { Router } from 'express';

const stripe = Stripe(process.env.STRIPE_KEY);
const stripeRouter = Router();

stripeRouter.post('/create-checkout-session', async (req, res) => {
    const {cart,userId} = req.body

    const line_items = cart.map(item => {
      return {
        price_data:{
          currency: 'thb',
          product_data:{
            name:item.name,
            images:[item.avatars[0].url],
            description:item.description,
            metadata:{
              id:item._id
          },
          },
          unit_amount:item.price * 100,
         },
         quantity:item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/product`,
      cancel_url: `${process.env.CLIENT_URL}/product`,
    });
  
    res.send({data:session,url:session.url});
  });

  export default stripeRouter;