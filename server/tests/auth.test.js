// Example test for auth controller
// To run: cd server && npm test

const request = require('supertest');
const express = require('express');
const User = require('../models/User');
const authController = require('../controllers/authController');

// Mock User model
jest.mock('../models/User');

describe('Auth Controller', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.post('/register', authController.register);
    app.post('/login', authController.login);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({ _id: '123', email: 'test@test.com', role: 'student' });

      const res = await request(app)
        .post('/register')
        .send({ email: 'test@test.com', password: 'password123', role: 'student' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should reject duplicate email', async () => {
      User.findOne.mockResolvedValue({ _id: '123', email: 'test@test.com' });

      const res = await request(app)
        .post('/register')
        .send({ email: 'test@test.com', password: 'password123', role: 'student' });

      expect(res.status).toBe(409);
    });
  });

  describe('POST /login', () => {
    it('should login user with correct credentials', async () => {
      const hashedPassword = '$2b$10$hashed.password';
      User.findOne.mockResolvedValue({
        _id: '123',
        email: 'test@test.com',
        password: hashedPassword,
        role: 'student',
      });

      // Mock bcrypt compare (in real test use actual bcrypt)
      jest.mock('bcrypt', () => ({
        compare: jest.fn().mockResolvedValue(true),
      }));

      const res = await request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should reject invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/login')
        .send({ email: 'wrong@test.com', password: 'password123' });

      expect(res.status).toBe(401);
    });
  });
});
