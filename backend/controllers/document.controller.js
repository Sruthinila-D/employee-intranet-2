const db = require("../db");

exports.downloadEmployeeDocuments = async (req, res) => {

try {

const userId = req.params.userId;

const result = await db.query(

`
SELECT *
FROM attachment
WHERE uploaded_by = $1
`,
[userId]

);

res.json(result.rows);

}
catch(err){

res.status(500).json({error: err.message});

}

};