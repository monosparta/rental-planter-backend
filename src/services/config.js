/* eslint-disable camelcase */
import db from '../db/models';

// default config
const config = { deadline: 5, rentLimit: 1 };

// get or create config
const initConfig = () =>
    db.Config.findOne({ order: [['updatedAt', 'DESC']] }).then((value) => {
        if (!value) {
            update(config.deadline, config.rentLimit);
            return;
        }

        config.deadline = value.Deadline;
        config.rentLimit = value.Rent_Limit;
    });

const getDeadline = () => config.deadline;
const getRentLimit = () => config.rentLimit;

const getUpdateHistory = () => db.Config.findAll({ include: db.User, order: [['updatedAt', 'DESC']] });

const update = async (deadline, rentLimit, user = undefined) => {
    await db.Config.create({
        Deadline: deadline,
        Rent_Limit: rentLimit,
        User_ID: user
    });

    config.deadline = deadline;
    config.rentLimit = rentLimit;
};

initConfig();

export { getDeadline, getRentLimit, update, getUpdateHistory };