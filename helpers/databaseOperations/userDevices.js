const connection = require("../../helpers/database/connectdatabase");

const addDeviceDb = async (
  usertoken,
  deviceName,
  deviceIp,
  deviceChannel,
  bridgeId
) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users where usertoken='${usertoken}'`;
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        if (result.length == 0) {
          reject("usertoken bulunamadi");
        } else {
          let userId = result[0].user_id;
          let deviceQuery = `SELECT * FROM userDevices WHERE user_id = '${userId}' AND deviceName='${deviceName}'`;
          connection.query(deviceQuery, function (err, deviceResult) {
            if (err) {
              reject(err);
            } else {
              if (deviceResult.length != 0) {
                reject("Bu cihaz zaten kayıtlı");
              } else {
                let insertQuery = `INSERT INTO userDevices (user_id, deviceName, deviceIp, deviceChannel, bridgeId) VALUES ('${userId}','${deviceName}','${deviceIp}','${deviceChannel}','${bridgeId}')`;
                connection.query(insertQuery, function (err, insertResult) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(true);
                  }
                });
              }
            }
          });
        }
      }
    });
  });
};

const getDevicesDb = async (usertoken) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM users where usertoken='${usertoken}'`;
        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.length == 0) {
                    reject("usertoken bulunamadi");
                } else {
                    let userId = result[0].user_id;
                    let deviceQuery = `SELECT * FROM userDevices WHERE user_id = '${userId}'`;
                    connection.query(deviceQuery, function (err, deviceResult) {
                        if (err) {
                            reject(err);
                        } else {
                            if (deviceResult.length != 0) {
                                resolve(deviceResult);
                            } else {
                                reject("Cihaz bulunamadi");
                            
                            }
                        }
                    });
                }
            }
        });
    });
};

const deleteDevicesDb = async (usertoken, deviceName) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM users where usertoken='${usertoken}'`;
        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.length == 0) {
                    reject("usertoken bulunamadi");
                } else {
                    let userId = result[0].user_id;
                    let deviceQuery = `SELECT * FROM userDevices WHERE user_id = '${userId}' AND deviceName='${deviceName}'`;
                    connection.query(deviceQuery, function (err, deviceResult) {
                        if (err) {
                            reject(err);
                        } else {
                            if (deviceResult.length != 0) {
                                let deleteQuery = `DELETE FROM userDevices WHERE user_id = '${userId}' AND deviceName='${deviceName}'`;
                                connection.query(deleteQuery, function (err, deleteResult) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(true);
                                    }
                                });
                            } else {
                                reject("Cihaz bulunamadi");
                            }
                        }
                    });
                }
            }
        });
    });
};




module.exports = { addDeviceDb , getDevicesDb,deleteDevicesDb};
