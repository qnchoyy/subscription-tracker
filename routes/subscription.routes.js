import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, deleteSubscription, getSubscription, getUserSubscriptions, updateSubscription } from "../controllers/subscription.controller.js";

const subscriptionRotuer = Router();

// subscriptionRotuer.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }));
subscriptionRotuer.get('/:id', authorize, getSubscription);
subscriptionRotuer.post('/', authorize, createSubscription);
subscriptionRotuer.put('/:id', authorize, updateSubscription);
subscriptionRotuer.delete('/:id', authorize, deleteSubscription);
subscriptionRotuer.get('/user/:id', authorize, getUserSubscriptions);
// subscriptionRotuer.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription' }));
// subscriptionRotuer.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals' }));

export default subscriptionRotuer;