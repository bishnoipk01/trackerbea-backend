import { executeWrite, executeRead } from '../config/db.js';

export async function getUsers() {
  try {
    const query = `MATCH (u:User) RETURN u`;
    const users = await executeRead(query);
    return users;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUserByEmail(email) {
  try {
    const query = `MATCH (u:User {email: $email}) RETURN u`;
    const params = { email };
    const user = await executeRead(query, params);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function createUser(data) {
  try {
    const query = `CREATE (u:User {user_id: randomUuid(), name: $name,username: $username, email: $email, password: $password, createdAt: $createdAt}) RETURN u`;
    const params = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date().toISOString(),
    };
    const user = await executeWrite(query, params);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
