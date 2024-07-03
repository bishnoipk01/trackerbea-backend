import neo4j from "neo4j-driver";
import { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } from "./vars.js";

// initialize global driver variable
let driver;

// create driver instance from neo4j driver by providing databse URI and authentication
export const initDriver = function () {
  driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
  );
};

initDriver();

// function to return driver object
export const getDriver = () => {
  if (driver) return driver;
};

/**
 *
 * @param {string} query
 * @param {object} params
 * @returns {object}
 */
// function to execute Read operation in databse
export const executeRead = async (query, params = {}) => {
  try {
    // open a driver session
    const session = driver.session();
    // perform read operation on database
    const res = await session.executeRead((tx) => tx.run(query, params));
    // close the session
    await session.close();
    // return data received from database
    return res.records;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 *
 * @param {string} query
 * @param {object} params
 * @returns {Records object}
 */
// function to execute Write operation in databse
export const executeWrite = async (query, params = {}) => {
  try {
    // open a driver session
    const session = driver.session();
    // perform write operation on databse
    const res = await session.executeWrite((tx) => tx.run(query, params));
    // close the session
    await session.close();
    // return data received from database
    return res.records;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
