let chai;
let chaiHttp;
let server;
let User;
let expect;

before(async () => {
  chai = (await import('chai')).default;
  chaiHttp = (await import('chai-http')).default;
  server = (await import('../server.js')).default;
  User = (await import('../models/User.js')).default;

  chai.use(chaiHttp);
  expect = chai.expect;
});

describe('User Registration and Login', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };
      const res = await chai.request(server)
        .post('/api/auth/register')
        .send({ data: JSON.stringify(user) });

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('token');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in an existing user', async () => {
      const user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      await user.save();
      const loginData = {
        email: 'john@example.com',
        password: 'password123'
      };
      const res = await chai.request(server)
        .post('/api/auth/login')
        .send({ data: JSON.stringify(loginData) });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('token');
    });
  });
});
