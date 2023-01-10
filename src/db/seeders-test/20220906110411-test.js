"use strict";

const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
  */
    const users = [
        {
            ID: '0484592b-4c87-4b01-abce-9f9235a65793',
            Name: 'Lori',
            Email: 'Lori.Crist@gmail.com',
            Password:
                '$2b$10$qGGiq8FrVVfK5bhaYDn4huGqDd.vcm1ulENTOwAry4Z5OHUcP2z8y',
            Is_Default_Password: false,
            Role: 0
        },
        {
            ID: 'edd937f2-c323-4b87-9440-ba7d91dfc9f6',
            Name: 'Eula',
            Email: 'Eula_Ritchie@hotmail.com',
            Password:
                '$2b$10$wZihPwuKl1RekfOm3vaZKuRu5qR7pAy8ICwUBU/YcjkUJ/6SjzZ1y',
            Is_Default_Password: false,
            Role: 0
        },
        {
            ID: 'ca61ef40-98a5-44d2-8347-b029798a917a',
            Name: 'Triston',
            Email: 'Triston.Rau@yahoo.com',
            Password:
                '$2b$10$wZihPwuKl1RekfOm3vaZKuRu5qR7pAy8ICwUBU/YcjkUJ/6SjzZ1y',
            Is_Default_Password: false,
            Role: 0
        },
        {
            ID: '503ac323-3296-4a84-b3b7-2c3dfc5e2689',
            Name: 'Alva',
            Email: 'Alva9@gmail.com',
            Password:
                '$2b$10$wZihPwuKl1RekfOm3vaZKuRu5qR7pAy8ICwUBU/YcjkUJ/6SjzZ1y',
            Is_Default_Password: false,
            Role: 0
        },
        {
            ID: '0cd3e857-ed9e-4494-889f-ad4ab4806557',
            Name: 'Victor',
            Email: 'Victor.Von@gmail.com',
            Password:
                '$2b$10$wZihPwuKl1RekfOm3vaZKuRu5qR7pAy8ICwUBU/YcjkUJ/6SjzZ1y',
            Is_Default_Password: false,
            Role: 0
        },
        {
            ID: '50de10eb-7158-4c61-9594-0fbb3341a824',
            Name: 'Jeanne',
            Email: 'Jeanne_Ondricka@gmail.com',
            Password:
                '$2b$10$36RdIQs6PgHtdyTqolzdCeV4o8FFZP5AO1KYMKzlUpYVXdOFRKDv2',
            Is_Default_Password: false,
            Role: 1
        },
        {
            ID: '4a9cbf46-8b3f-47ed-a016-88f24ce6057c',
            Name: 'Leopoldo',
            Email: 'Leopoldo10@gmail.com',
            Password:
                '$2b$10$36RdIQs6PgHtdyTqolzdCeV4o8FFZP5AO1KYMKzlUpYVXdOFRKDv2',
            Is_Default_Password: false,
            Role: 1
        }
    ];
    await queryInterface.bulkInsert("Users", users);

    let containers = [];
    for (let x = 1; x <= 3; ++x) {
      containers.push({ ID: x });
    }
    await queryInterface.bulkInsert("Containers", containers);

    const rents = [
        {
            ID: 1,
            User_ID: '0484592b-4c87-4b01-abce-9f9235a65793',
            Plant_ID: 1,
            Container_ID: 1,
            Register_Time: new Date('2022-08-28T13:52:19.130Z'),
            Rent_Time: new Date('2022-09-02T15:19:27.415Z'),
            Deadline: 5
        },
        {
            ID: 2,
            User_ID: '0484592b-4c87-4b01-abce-9f9235a65793',
            Plant_ID: 2,
            Container_ID: 2,
            Register_Time: new Date('2022-09-01T13:52:19.130Z'),
            Rent_Time: new Date('2022-09-05T17:19:27.415Z'),
            Deadline: 5
        }
    ];
    const plants = [
        {
            ID: 1,
            Name: 'agriculture',
            Intro: 'Vel sed repudiandae tenetur deleniti perspiciatis neque nulla voluptas enim.',
            Img_Path: 'https://source.unsplash.com/category/nature/640x480',
            Nickname: 'mechanic',
            Min_Humid: 12
        },
        {
            ID: 2,
            Name: 'happiness',
            Intro: 'Officia et ut et perspiciatis autem sapiente recusandae et ab.',
            Img_Path: 'https://source.unsplash.com/category/nature/640x480',
            Nickname: 'picturesque',
            Min_Humid: 18
        }
    ];
    await queryInterface.bulkInsert("Plants", plants);
    await queryInterface.bulkInsert("Rents", rents);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Configs", null, {});
    await queryInterface.bulkDelete("Rents", null, {});
    await queryInterface.bulkDelete("Containers", null, {});
    await queryInterface.bulkDelete('Users', {
        Email: {[Op.ne]: 'root@rental.planter'}
    });
    await queryInterface.bulkDelete("Plants", null, {});
  },
};
