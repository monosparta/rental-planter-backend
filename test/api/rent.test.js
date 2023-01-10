import request from 'supertest';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import app from '../../src/app';
import { readLatestRentId } from '../util/mailReader';

let token, adminToken;

beforeAll(async () => {
    const resUser = await request(app)
        .post('/api/user/login')
        .send({ email: 'Eula_Ritchie@hotmail.com', password: 'demo' });
    token = resUser.body.token;

    const resAdmin = await request(app)
        .post('/api/user/login')
        .send({ email: 'Jeanne_Ondricka@gmail.com', password: 'demo' });
    adminToken = resAdmin.body.token;
});

describe('Test user rent list', () => {
    test('It should return a list of other rents.', () => {
        return request(app)
            .get('/api/rent/list/others')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
            });
    });
});

describe('Test user rent request', () => {
    test('It should proceed the rent request.', () => {
        return request(app)
            .post('/api/rent/register')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Registration successful');
                expect(res.body.waiting).toBe(false);
            });
    });
    test('It should block the second rent request.', () => {
        return request(app)
            .post('/api/rent/register')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(409)
            .then((res) => {
                expect(res.body.message).toBe('Too many rents');
            });
    });

    test('It should have user rents not empty.', () => {
        return request(app)
            .get('/api/user')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
                expect(res.body.rents.length).not.toBe(0);
            });
    });
});

describe('Test rent wait list', () => {
    let tempToken = '';
    beforeAll(async () => {

        const resUser = await request(app)
            .post('/api/user/login')
            .send({ email: 'Victor.Von@gmail.com', password: 'demo' });
        tempToken = resUser.body.token;
    });

    test('It should proceed the rent request and add to waiting list.', async () => {
        return request(app)
            .post('/api/rent/register')
            .set('Auth-Method', 'JWT')
            .set('Auth', tempToken)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Registration successful');
                expect(res.body.waiting).toBe(true);
            });
    });

    test('It should skip the rent without container.', () => {
        return request(app)
            .get('/api/user')
            .set('Auth-Method', 'JWT')
            .set('Auth', tempToken)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
                expect(res.body.rents.length).toBe(0);
            });
    });

    test('It should have waitlist not empty for admin.', () => {
        return request(app)
            .get('/api/admin/waitList')
            .set('Auth-Method', 'JWT')
            .set('Auth', adminToken)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
                expect(res.body.data.length).not.toBe(0);
            });
    });
});

describe('Test user filling rent form', () => {
    let plantId;
    beforeAll(() => {
        plantId = readLatestRentId('Eula_Ritchie@hotmail.com');
    });

    test('It should block plant info when no body is provided.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block plant info when body is incorrect (1/2).', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', plantId)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block plant info when body is incorrect (2/2).', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block plant info when requested rent is not found.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', 0)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Requested rent not found');
            });
    });

    test('It should block plant info when requested rent is invalid (ex: not owned).', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', 1)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Requested rent not found');
            });
    });


    test('It should block invalid image.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', plantId)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/invalidImage.7z`)
            .expect(400);
    });

    test('It should block large image.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', plantId)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/largeImage.jpg`)
            .expect(400);
    });

    test('It should proceed plant info.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', plantId)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });

    test('It should block plant info when request send data second time.', () => {
        return request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', plantId)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(409)
            .then((res) => {
                expect(res.body.message).toBe('Plant already exist');
            });
    });
});

describe('Test user modify rent', () => {
    let plantId;
    beforeAll(() => {
        plantId = readLatestRentId('Eula_Ritchie@hotmail.com');
    });

    test('It should block modify plant info when no body is provided.', () => {
        return request(app)
            .put(`/api/rent/plantInfo/${plantId}`)
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block modify plant info when body is incomplete.', () => {
        return request(app)
            .put(`/api/rent/plantInfo/${plantId}`)
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('name', 'test')
            .field('nickname', 'test-nick')
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block modify plant info when requested rent is not found. (1/2)', () => {
        return request(app)
            .put('/api/rent/plantInfo/0')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Requested rent not found');
            });
    });

    test('It should block modify plant info when requested rent is not found. (2/2)', () => {
        return request(app)
            .put('/api/rent/plantInfo/0')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Requested rent not found');
            });
    });

    test('It should block modify plant info when requested rent is invalid (ex: not owned).', () => {
        return request(app)
            .put('/api/rent/plantInfo/1')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Requested rent not found');
            });
    });

    test('It should block invalid image.', () => {
        return request(app)
            .put(`/api/rent/plantInfo/${plantId}`)
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/invalidImage.7z`)
            .expect(400);
    });

    test('It should block large image.', () => {
        return request(app)
            .put(`/api/rent/plantInfo/${plantId}`)
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/largeImage.jpg`)
            .expect(400);
    });

    test('It should block modify plant info when only file is provided.', () => {
        return request(app)
            .put(`/api/rent/plantInfo/${plantId}`)
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should proceed modify plant info when no file is provided.', () => {
        return request(app)
            .put(`/api/rent/plantInfo/${plantId}`)
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });

    test('It should proceed modify plant info.', () => {
        return request(app)
            .put(`/api/rent/plantInfo/${plantId}`)
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });
});

describe('Test file delete', () => {
    test('It should block rent delete request when rent is not found.', () => {
        return request(app)
            .delete('/api/admin/rent/0')
            .set('Auth-Method', 'JWT')
            .set('Auth', adminToken)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Rent not found');
            });
    });

    test('It should proceed rent delete with plant data.', async () => {
        return request(app)
            .delete(`/api/admin/rent/${readLatestRentId('Eula_Ritchie@hotmail.com')}`)
            .set('Auth-Method', 'JWT')
            .set('Auth', adminToken)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Delete successful');
            });
    });

    test('It should proceed rent delete without plant data.', async () => {
        return request(app)
            .delete(
                `/api/admin/rent/${readLatestRentId('Victor.Von@gmail.com')}`
            )
            .set('Auth-Method', 'JWT')
            .set('Auth', adminToken)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Delete successful');
            });
    });

    test('It should proceed rent delete with deleted image.', async () => {
        await request(app)
            .post('/api/rent/register')
            .set('Auth-Method', 'JWT')
            .set('Auth', token);

        const rentId = readLatestRentId('Eula_Ritchie@hotmail.com');

        await request(app)
            .post('/api/rent/plantInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .field('rent', rentId)
            .field('name', 'test')
            .field('intro', 'test\ntest')
            .field('nickname', 'test-nick')
            .field('minHumid', 20)
            .attach('image', `${__dirname}/../files/image.jpg`);

        const userData = await request(app)
            .get('/api/user')
            .set('Auth-Method', 'JWT')
            .set('Auth', token);

        const rent = userData.body.rents.find(x => x.id.toString() === rentId);

        if (rent.plant.imgPath.startsWith('uploads/')) {
            if (existsSync(join('./public', rent.plant.imgPath))) {
                unlinkSync(join('./public', rent.plant.imgPath));
            }
        }

        return request(app)
            .delete(
                `/api/admin/rent/${readLatestRentId(
                    'Eula_Ritchie@hotmail.com'
                )}`
            )
            .set('Auth-Method', 'JWT')
            .set('Auth', adminToken)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Delete successful');
            });
    });

    test('It should proceed rent delete with fake data.', () => {
        return request(app)
            .delete('/api/admin/rent/2')
            .set('Auth-Method', 'JWT')
            .set('Auth', adminToken)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Delete successful');
            });
    });
});
