import PouchDB from "pouchdb";
const updateDetailsPouchDb = (dbName, details) => {
  try {
    return new Promise((resolve, reject) => {
      const db = new PouchDB(dbName);
      // db.get((error, document) => {
      //   if (error) {
      //     const updatePouchDb = {
      //       _id: collection,
      //       [collection]: details,
      //     };
      //     db.put(updatePouchDb);
      //   } else {
      // const updatePouchDb = {
      //   _id: document._id,
      //   [collection]: details,
      //   _rev: document._rev,
      // };
      db.put(details, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
          console.log(response, "ress");
        }
      });
      //   }
      // });
    })
      .then((res) => res)
      .catch((error) => error);
  } catch (error) {
    console.error("pouchDB put -->", error);
  }
};

export default updateDetailsPouchDb;