/* eslint-disable camelcase */
import db from '../db/models';
import { getPlant } from './plant';
import { Op } from 'sequelize';
import { getUserFromID } from './user';

/* Get rent data from user GET users data */

const getWaitingRentData = async () => {
    const waitingList = await getWaitingRents();

    const response = [];
    let index = 0;
    for (const waiting of waitingList) {
        const user = await getUserFromID(waiting.User_ID);

        response.push({
            index: ++index,
            name: user.Name,
            email: user.Email
        });
    }

    return response;
};

const getAllRentData = async () => {
    const rents = await getAllRents();

    return getRentData(rents, true);
};

const getUserRentData = async userId => {
    const rents = await getUserRents(userId);

    return getRentData(rents);
};

const getOtherUserRentData = async userId => {
    const rents = await getOtherUserRents(userId);

    return getRentData(rents);
};

const getRentData = async (rents, showUser = false) => {
    const rentsData = [];
    for (const rent of rents) {
        if (!rent.Container_ID) continue;

        const plant = await getPlant(rent.Plant_ID);

        const rentData = {
            id: rent.ID,
            plant: (plant !== null) ? {
                name: plant.Name,
                intro: plant.Intro,
                imgPath: plant.Img_Path,
                nickname: plant.Nickname,
                minHumid: plant.Min_Humid
            } : null,
            container: rent.Container_ID
        };

        if (showUser) {
            const user = await getUserFromID(rent.User_ID);

            rentData.owner = {
                id: user.ID,
                name: user.Name,
                email: user.Email,
                isDefaultPassword: user.Is_Default_Password,
                role: user.Role
            };
        }

        rentsData.push(rentData);
    }

    return rentsData;
};

const getRentById = ID => db.Rent.findOne({ where: { ID } });

const getUserRents = userId => db.Rent.findAll({ where: { User_ID: userId } });

const getWaitingRents = () => db.Rent.findAll({ where: { Container_ID: null } });

const getAllRents = () => db.Rent.findAll();

const deleteRentById = ID => db.Rent.destroy({ where: { ID } });

const getOtherUserRents = userId =>
    db.Rent.findAll({
        where: { User_ID: { [Op.ne]: userId } }
    });

const insertRent = userId =>
    db.Rent.create({
        User_ID: userId,
        Register_Time: new Date()
    });

const markContainerTaken = ID =>
    db.Rent.update({
        Get_Time: new Date()
    }, { where: { ID } });

const assignContainer = (ID, containerId, deadline) =>
    db.Rent.update({
        Container_ID: containerId,
        Rent_Time: new Date(),
        Deadline: deadline
    }, { where: { ID } });

const assignPlant = (ID, plantId) =>
    db.Rent.update({
        Plant_ID: plantId
    }, { where: { ID } });

export {
    getUserRentData,
    getUserRents,
    getOtherUserRentData,
    insertRent,
    assignContainer,
    assignPlant,
    getRentById,
    getAllRentData,
    getWaitingRents,
    getWaitingRentData,
    deleteRentById,
    markContainerTaken
};