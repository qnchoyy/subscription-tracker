import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

import Subscription from "../models/Subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })

        res.status(201).json({ success: true, data: subscription, workflowRunId });
    } catch (e) {
        next(e);
    }
}

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { renewalDate, reminderDays } = req.body;

        const subscription = await Subscription.findOne({ _id: id, user: req.user._id });

        if (!subscription) {
            const error = new Error('Subscription not found or access denied');
            error.statusCode = 404;
            throw error;
        }

        const updatedSubscription = await Subscription.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true, runValidators: true }
        );

        if (renewalDate || reminderDays) {
            await workflowClient.trigger({
                url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
                body: {
                    subscriptionId: id,
                    update: true
                },
                headers: { 'content-type': 'application/json' },
                retries: 0,
            });
        }

        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: updatedSubscription
        });

    } catch (e) {
        next(e);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }

        await Subscription.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "Subscription deleted successfully" });
    } catch (e) {
        next(e);
    }
};