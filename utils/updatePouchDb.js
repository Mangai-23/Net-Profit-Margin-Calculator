import updateDetailsPouchDb from "./updateDetailsPouchDb";

const updatePouchDb = async (pouchdbResponse, completedWork) => {
  const updatedPouchDb = {
    _id: pouchdbResponse._id,
    data: completedWork,
    _rev: pouchdbResponse._rev,
  };
  await updateDetailsPouchDb("netprofit", updatedPouchDb);
};

export default updatePouchDb;