import PouchDB from "pouchdb";

const getDetailPouchDb = (dbName, keyName) => {
  try {
    const db = new PouchDB(dbName);
    return new Promise((resolve, reject) => {
      db.get(keyName, (error, document) => {
        if (error) {
          console.error(error); // Log the error for debugging
          resolve("no record found");
        } else {
          resolve(document);
        }
      });
    }).then((res)=>res)
  } catch (error) {
    console.error(error);
    return  // Return a rejected Promise in case of any error
  }
};

export default getDetailPouchDb;

