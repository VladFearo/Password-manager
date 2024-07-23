let chai;
let chaiHttp;
let server;
let User;
let Password;
let expect;

before(async () => {
  chai = (await import('chai')).default;
  chaiHttp = (await import('chai-http')).default;
  server = (await import('../server.js')).default;
  User = (await import('../models/User.js')).default;
  Password = (await import('../models/Password.js')).default;

  chai.use(chaiHttp);
  expect = chai.expect;
});

describe('Password Management', () => {
  let token = '';
  let userId = '';

  before(async () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };
    const res = await chai.request(server)
      .post('/api/auth/register')
      .send({ data: JSON.stringify(user) });

    token = res.body.token;
    userId = res.body.user._id;
  });

  describe('POST /api/password/add', () => {
    it('should add a new password', async () => {
      const passwordData = {
        userId,
        website: 'example.com',
        password: 'password123'
      };
      const res = await chai.request(server)
        .post('/api/password/add')
        .set('Authorization', `Bearer ${token}`)
        .send({ data: JSON.stringify(passwordData) });

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('newPassword');
    });
  });

  describe('GET /api/password/all', () => {
    it('should retrieve all passwords', async () => {
      const res = await chai.request(server)
        .get('/api/password/all')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('PUT /api/password/update', () => {
    it('should update a password', async () => {
      const passwordData = {
        userId,
        website: 'example.com',
        password: 'newpassword123'
      };
      const res = await chai.request(server)
        .put('/api/password/update')
        .set('Authorization', `Bearer ${token}`)
        .send({ data: JSON.stringify(passwordData) });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').eql('Password updated successfully');
    });
  });

  describe('DELETE /api/password/delete/:id', () => {
    it('should delete a password', async () => {
      const passwordData = {
        userId,
        website: 'example.com',
        password: 'password123'
      };
      const password = new Password(passwordData);
      await password.save();
      const res = await chai.request(server)
        .delete(`/api/password/delete/${password._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').eql('Password deleted successfully');
    });
  });
});
