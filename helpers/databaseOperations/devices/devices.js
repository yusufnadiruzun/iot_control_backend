const connection = require("../../database/connectdatabase");

const addDeviceDb = async (deviceName, deviceIp, deviceChannel, bridgeId) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM devices where deviceName='${deviceName}'`;
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        if (result.length != 0) {
          reject("Bu cihaz zaten kayıtlı");
        } else {
          let insertQuery = `INSERT INTO devices (deviceName, deviceIp, deviceChannel, bridgeId) VALUES ('${deviceName}','${deviceIp}','${deviceChannel}','${bridgeId}')`;
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
  });
};

const getDevicesDb = async () => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM devices`;
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        if (result.length == 0) {
          reject("Sistemde kayıtlı cihaz bulunamadı");
        } else {
          resolve(result);
        }
      }
    });
  });
};

const deleteDevicesDb = async (deviceName) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM devices WHERE deviceName='${deviceName}'`;
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        if (result.length === 0) {
          reject("Cihaz bulunamadı");
        } else {
          let deviceID = result[0].device_id;
          let deleteQuery = `DELETE FROM devices WHERE device_id='${deviceID}'`;
          connection.query(deleteQuery, function (err, deleteResult) {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        }
      }
    });
  });
};

module.exports = {
    addDeviceDb,
    getDevicesDb,
    deleteDevicesDb
}