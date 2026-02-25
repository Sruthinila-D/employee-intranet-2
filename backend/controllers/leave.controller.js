const leaveService = require("../services/leave.service");


// ✅ CREATE LEAVE

exports.createLeave = async (req, res) => {

  try {

    const leaveData = {

      user_id: req.body.user_id,

      leave_type: req.body.leave_type,

      start_date: req.body.start_date,

      end_date: req.body.end_date,

      total_days: req.body.total_days,

      reason: req.body.reason,

      file: req.file ? req.file.originalname : null,

      status: "Pending"

    };


    const result = await leaveService.createLeave(leaveData);


    res.status(200).json({

      message: "Leave created successfully",

      data: result

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Error creating leave"

    });

  }

};



// ✅ GET ALL LEAVES

exports.getAllLeaves = async (req, res) => {

  try {

    const leaves = await leaveService.getAllLeaves();


    res.status(200).json(leaves);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Error fetching leaves"

    });

  }

};



// ✅ GET LEAVE BY ID

exports.getLeaveById = async (req, res) => {

  try {

    const id = req.params.id;


    const leave = await leaveService.getLeaveById(id);


    res.status(200).json(leave);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Error fetching leave"

    });

  }

};



// ✅ UPDATE STATUS

exports.updateLeaveStatus = async (req, res) => {

  try {

    const id = req.params.id;

    const status = req.body.status;


    const result = await leaveService.updateLeaveStatus(id, status);


    res.status(200).json({

      message: "Status updated",

      data: result

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Error updating status"

    });

  }

};



// ✅ GET LEAVES BY USER

exports.getLeavesByUser = async (req, res) => {

  try {

    const userId = req.params.userId;


    const leaves = await leaveService.getLeavesByUser(userId);


    res.status(200).json(leaves);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Error fetching user leaves"

    });

  }

};