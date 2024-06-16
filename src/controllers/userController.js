import { executeRead, executeWrite } from "../config/db.js";
import bcrypt from "bcryptjs";

export async function getAllUsers(req, res) {
  const query = `MATCH (u:User) RETURN u`;
  const user = await executeRead(query);
  res.status(200).json({
    status: "true",
    data: user,
  });
}

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const query = `CREATE (u:User {user_id: randomUuid(), name: $name, email: $email, password: $hashedPassword}) RETURN u`;
  const params = { name, email, hashedPassword };
  const data = await executeWrite(query, params);

  const user = data[0].get("u").properties;
  res.status(200).json({
    status: "true",
    data: { user },
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const query = `MATCH (u:User {email: $email}) RETURN u`;
  const params = { email };
  const data = await executeRead(query, params);
  if (data.length == 0)
    return res.status(200).json({
      status: "false",
      message: "Invalid username or password",
    });
  const user = data[0].get("u").properties;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(200).json({
      status: "false",
      message: "Invalid username or password",
    });
  } else
    res.status(200).json({
      status: "true",
      data: { user },
    });
}
