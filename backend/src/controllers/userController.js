const sendResponse = require("../utils/sendresponse");

const getUser = async (req, res) => {
  try {
    const { user } = req;

    return sendResponse(res, 200, "User details fetched successfully", {user});
  } catch (error) {
    console.log("Error getting user:", error);
    return sendResponse(res, 500, "Error getting user details");
  }
};

module.exports = {
  getUser,
};
