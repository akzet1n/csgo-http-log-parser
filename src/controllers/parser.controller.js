import asyncHandler from "express-async-handler";

// @desc    Get the data from the CS:GO server
// route    GET /api/
// @access  Public
const parseData = asyncHandler(async (req, res) => {

    res.status(200).json({ msg: "OK" });

})

export { parseData };