import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../config/database";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(`SELECT * FROM users`);

    return res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json("Internal server error.");
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  try {
    const response: QueryResult = await pool.query(
      `SELECT * FROM users WHERE id = ${userId}`
    );

    return res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json("Internal server error.");
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email } = req.body;

  try {
    await pool.query(
      `INSERT INTO users(name, email) VALUES('${name}', '${email}')`
    );

    return res.json({
      message: "User created succesfully!",
      body: {
        name,
        email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json("Internal server error.");
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const { name, email } = req.body;

  try {
    await pool.query(
      `UPDATE user SET name = ${name}, email = ${email} WHERE id = ${userId}`
    );

    return res.json({
      message: `User ${userId} updated succesfully!`,
      body: {
        name,
        email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json("Internal server error.");
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  try {
    await pool.query(`DELETE FROM users WHERE id = ${userId}`);

    return res.json(`User ${userId} deleted succesfully!`);
  } catch (error) {
    console.error(error);

    return res.status(500).json("Internal server error.");
  }
};
