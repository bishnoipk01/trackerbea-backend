import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { getUserByEmail, getUsers, createUser } from '../models/userModel.js';

import { JWT_SECRET_KEY, JWT_EXPIRATION } from '../config/vars.js';

const createUserToken = (userId) =>
  JWT.sign({ id: userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRATION,
  });

const verifyJWT = (token) => {
  try {
    const decoded = JWT.verify(token, JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
export async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    res.status(200).json({
      status: 'true',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    });
  }
}

export async function getUserById(req, res) {
  // TODO:
}

export async function registerUser(req, res) {
  try {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = { name, email, username, password: hashedPassword };
    const result = await createUser(data);
    const user = result[0].get('u').properties;
    const token = createUserToken(user.id);
    res.status(200).json({
      status: 'true',
      data: { ...user, token },
    });
  } catch (e) {
    res.status(500).json({
      status: 'false',
      message: e.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const data = await getUserByEmail(email);
    if (data.length === 0) {
      return res.status(200).json({
        status: 'false',
        message: 'Invalid username or password',
      });
    }
    const user = data[0].get('u').properties;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({
        status: 'false',
        message: 'Invalid username or password',
      });
    }
    return res.status(200).json({
      status: 'true',
      data: { user },
    });
  } catch (e) {
    return res.status(500).json({
      status: 'false',
      message: e.message,
    });
  }
}

export async function updateUser(req, res) {
  // TODO:
}

export async function deleteUser(req, res) {
  // TODO:
}

export async function resetPassword(req, res) {
  // TODO:
}
