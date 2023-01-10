import request from 'supertest';
import app from '../../src/app';

let token, userToken;

beforeAll(async () => {
    const res = await request(app)
        .post('/api/user/login')
        .send({ email: 'Jeanne_Ondricka@gmail.com', password: 'demo' });
    token = res.body.token;

    const resUser = await request(app)
        .post('/api/user/login')
        .send({ email: 'Eula_Ritchie@hotmail.com', password: 'demo' });
    userToken = resUser.body.token;
});

describe('Test user permission and rented List', () => {
    test('It should block admin rented List request sent by user.', async () => {
        return request(app)
            .get('/api/admin/rentedInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', userToken)
            .expect(403)
            .then((res) => {
                expect(res.body.message).toBe('Permission denied!');
            });
    });
    test('It should proceed admin rented List request sent by admin.', () => {
        return request(app)
            .get('/api/admin/rentedInfo')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
            });
    });
});

describe('Test wait list', () => {
    test('It should proceed admin wait list request sent by admin.', () => {
        return request(app)
            .get('/api/admin/waitList')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
            });
    });
});

describe('Test rented amount', () => {
    test('It should proceed admin rented amount request sent by admin.', () => {
        return request(app)
            .get('/api/admin/rentedAmount')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query Success');
            });
    });
});

describe('Test take rent', () => {
    test('It should block admin mark rent taken request when rent is not found.', () => {
        return request(app)
            .put('/api/admin/rent/0')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Rent not found');
            });
    });

    test('It should proceed admin mark rent taken request sent by admin.', () => {
        return request(app)
            .put('/api/admin/rent/1')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });

    test('It should block admin mark rent taken request when rent container is already taken.', () => {
        return request(app)
            .put('/api/admin/rent/1')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(409)
            .then((res) => {
                expect(res.body.message).toBe('Rent already taken');
            });
    });
});

describe('Test add admin', () => {
    test('It should block admin add admin request when no body is provided.', () => {
        return request(app)
            .post('/api/admin/admin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block admin add admin request when body is incomplete. (1/2)', () => {
        return request(app)
            .post('/api/admin/admin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ email: 'Lori.Crist@gmail.com' })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block admin add admin request when body is incomplete. (2/2)', () => {
        return request(app)
            .post('/api/admin/admin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ name: 'Lori' })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });

    test('It should block admin add admin request when email is invalid.', () => {
        return request(app)
            .post('/api/admin/admin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ name: 'Lori', email: 'not-email' })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid email');
            });
    });

    test('It should block admin add admin request when user is already in user database.', () => {
        return request(app)
            .post('/api/admin/admin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ name: 'Lori', email: 'Lori.Crist@gmail.com' })
            .expect(409)
            .then((res) => {
                expect(res.body.message).toBe('User already exist');
            });
    });

    test('It should proceed admin delete rent request sent by admin.', () => {
        return request(app)
            .post('/api/admin/admin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ name: 'Test', email: process.env.EMAIL_ACCOUNT })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Add success');
            });
    });
});

describe('Test member manage', () => {
    test('It should proceed admin get member list request sent by admin.', () => {
        return request(app)
            .get('/api/admin/members')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query success');
            });
    });

    test('It should proceed admin update member list request sent by admin.', () => {
        return request(app)
            .put('/api/admin/members')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful.');
            });
    });
});

describe('Test member update', () => {
    test('It should block update admin from this method.', () => {
        return request(app)
            .put('/api/admin/member/50de10eb-7158-4c61-9594-0fbb3341a824')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('User not found');
            });
    });
    test('It should block update member that does not exist.', () => {
        return request(app)
            .put('/api/admin/member/eafaca48-1512-48f5-abb9-e9d912bba011')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('User not found');
            });
    });
    test('It should block update member that is no longer member.', () => {
        return request(app)
            .put('/api/admin/member/ca61ef40-98a5-44d2-8347-b029798a917a')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('Member not found');
            });
    });
    test('It should proceed update member request.', () => {
        return request(app)
            .put('/api/admin/member/503ac323-3296-4a84-b3b7-2c3dfc5e2689')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });
});

describe('Test member delete', () => {
    test('It should block delete admin from this method.', () => {
        return request(app)
            .delete('/api/admin/member/50de10eb-7158-4c61-9594-0fbb3341a824')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('User not found');
            });
    });
    test('It should block delete member that does not exist.', () => {
        return request(app)
            .delete('/api/admin/member/eafaca48-1512-48f5-abb9-e9d912bba011')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('User not found');
            });
    });
    test('It should proceed delete member request.', () => {
        return request(app)
            .delete('/api/admin/member/503ac323-3296-4a84-b3b7-2c3dfc5e2689')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Delete successful');
            });
    });
});

describe('Test get and delete admin', () => {
    let adminList = [];

    test('It should return a list of admins.', () => {
        return request(app)
            .get('/api/admin/admin')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                adminList = res.body.data;
                expect(res.body.message).toBe('Query Success');
            });
    });

    test('It should block delete admin that\'s not exist.', () => {
        return request(app)
            .delete('/api/admin/admin/997939d1-564b-4496-bf70-d2fe30f15c55')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('User not found');
            });
    });

    test('It should block delete admin that\'s self account.', () => {
        return request(app)
            .delete('/api/admin/admin/50de10eb-7158-4c61-9594-0fbb3341a824')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(403)
            .then((res) => {
                expect(res.body.message).toBe('You are deleting yourself!');
            });
    });

    test('It should block delete admin that\'s root.', () => {
        return request(app)
            .delete(
                `/api/admin/admin/${
                    adminList.find((x) => x.email === 'root@rental.planter').id
                }`
            )
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(403)
            .then((res) => {
                expect(res.body.message).toBe('Could not delete this admin');
            });
    });

    test('It should procees admin delete.', () => {
        return request(app)
            .delete('/api/admin/admin/4a9cbf46-8b3f-47ed-a016-88f24ce6057c')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Delete successful');
            });
    });
});

describe('Test config manage', () => {
    test('It should block modify config with an empty body', () => {
        return request(app)
            .put('/api/admin/config')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Invalid body');
            });
    });
    test('It should proceed modify config (1/3).', () => {
        return request(app)
            .put('/api/admin/config')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ deadline: 4 })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });
    test('It should proceed modify config (2/3).', () => {
        return request(app)
            .put('/api/admin/config')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ rentLimit: 4 })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });
    test('It should proceed modify config (3/3).', () => {
        return request(app)
            .put('/api/admin/config')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .send({ deadline: 5, rentLimit:1 })
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Update successful');
            });
    });
    test('It should proceed getting config.', () => {
        return request(app)
            .get('/api/admin/config')
            .set('Auth-Method', 'JWT')
            .set('Auth', token)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('Query success');
                expect(res.body.data).toBeDefined();
                expect(res.body.data.current).toBeDefined();
                expect(res.body.data.history).toBeDefined();
                expect(res.body.data.history.length).not.toBe(0);
            });
    });
});
