const connection = require("../../helpers/database/connectdatabase");

const getUserByToken = (usertoken) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users WHERE usertoken='${usertoken}'`;
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        if (result.length === 0) {
          reject("Usertoken bulunamadı");
        } else {
          resolve(result[0].user_id);
        }
      }
    });
  });
};

const getDeviceIdByName = (deviceName) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM devices WHERE deviceName='${deviceName}'`;
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        if (result.length === 0) {
          reject("Cihaz bulunamadı");
        } else {
          resolve(result[0].device_id);
        }
      }
    });
  });
};

const checkDeviceUserRelationship = (userId, deviceId) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM usersDevices WHERE user_id='${userId}' AND device_id='${deviceId}'`;
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        if (result.length !== 0) {
          reject("Bu cihaz zaten kayıtlı");
        } else {
          resolve();
        }
      }
    });
  });
};

const addUserDeviceRelationship = (userId, deviceId) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO usersDevices (user_id, device_id) VALUES ('${userId}', '${deviceId}')`;
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const addDeviceUserDb = async (usertoken, deviceName) => {
  try {
    const userId = await getUserByToken(usertoken);
    const deviceId = await getDeviceIdByName(deviceName);
    await checkDeviceUserRelationship(userId, deviceId);
    await addUserDeviceRelationship(userId, deviceId);
    return true;
  } catch (err) {
    throw err;
  }
};

const getUserDevices = (userId) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT d.deviceName, d.deviceIp, d.deviceChannel
      FROM devices AS d
      INNER JOIN usersDevices AS ud ON d.device_id = ud.device_id
      WHERE ud.user_id = '${userId}'
    `;
    connection.query(query, function (err, result) {
      if (err) {
      return  reject(err);
      } else {
      
        return resolve(result);
      }
    });
  });
};

const getUserDevicesDb = async (usertoken) => {
  const userId = await getUserByToken(usertoken);
  const userDevices = await getUserDevices(userId);
  return userDevices;
};

const deleteDevice = (userId, deviceId) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM usersDevices WHERE user_id = '${userId}' AND device_id = '${deviceId}'`;
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

const deleteUserDeviceDb = async (usertoken, deviceName) => {

    const userId = await getUserByToken(usertoken);
    const deviceId = await getDeviceIdByName(deviceName);
    deleteDevice(userId, deviceId);
}


module.exports = {
  addDeviceUserDb,
  getUserDevicesDb,
  deleteUserDeviceDb,
};
