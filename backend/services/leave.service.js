const db = require("../db");


// CREATE LEAVE

exports.createLeave = async (leaveData, file) => {

    const {

        user_id,

        leave_type,

        start_date,

        end_date,

        total_days,

        reason

    } = leaveData;


    const leaveQuery = `

    INSERT INTO leave_request

    (user_id, leave_type, start_date, end_date, total_days, reason)

    VALUES ($1,$2,$3,$4,$5,$6)

    RETURNING *

    `;


    const leaveResult = await db.query(

        leaveQuery,

        [

            user_id,

            leave_type,

            start_date,

            end_date,

            total_days,

            reason

        ]

    );


    const leave = leaveResult.rows[0];



    // SAVE ATTACHMENT


    if(file){

        const attachQuery = `

        INSERT INTO attachment

        (

            reference_id,

            reference_type,

            file_name,

            file_type,

            file_size,

            file_base64,

            uploaded_by

        )

        VALUES ($1,'LEAVE',$2,$3,$4,$5,$6)

        `;


        await db.query(

            attachQuery,

            [

                leave.leave_id,

                file.originalname,

                file.mimetype,

                file.size,

                file.buffer.toString("base64"),

                leave.user_id

            ]

        );

    }


    return leave;

};




// GET ALL LEAVES


exports.getAllLeaves = async () => {


    const query = `

    SELECT

    l.*,

    json_agg(

        json_build_object(

            'file_name',a.file_name,

            'file_type',a.file_type

        )

    ) as attachments

    FROM leave_request l

    LEFT JOIN attachment a

    ON l.leave_id=a.reference_id

    AND a.reference_type='LEAVE'

    GROUP BY l.leave_id

    ORDER BY l.created_at DESC

    `;


    const result = await db.query(query);


    return result.rows;

};




// GET SINGLE LEAVE


exports.getLeaveById = async (id) => {


    const result = await db.query(

        "SELECT * FROM leave_request WHERE leave_id=$1",

        [id]

    );


    return result.rows[0];

};




// UPDATE STATUS


exports.updateLeaveStatus = async (id,status)=>{


    const result = await db.query(

        `

        UPDATE leave_request

        SET status=$1

        WHERE leave_id=$2

        RETURNING *

        `,

        [status,id]

    );


    return result.rows[0];

};