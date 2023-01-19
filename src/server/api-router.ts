import express from "express"
import cors from "cors"
import { connectClient } from "./db"

const router = express.Router();
router.use(cors());
router.use(express.json())

router.get("/contests", async(req, res) => {
    // get data from MongoDB
    const client = await connectClient();

    const contests = await client.collection("contests").find().project({id: 1, categoryName: 1, contestName: 1, _id: 0}).toArray();
    res.send({ contests });
}); // define route

router.get("/contest/:contestId", async(req, res) => {
    const client = await connectClient();
    // req.params is an object -- contestId is a property
    const contest = await client.collection("contests").findOne({id: req.params.contestId})

    res.send({contest})
})

router.post("/contest/:contestId",async (req, res) => {
    const client = await connectClient();
    const { newNameValue } = req.body;

    const doc = await client.collection("contests")
    .findOneAndUpdate( {id: req.params.contestId}, 
        {
            $push: {
                names: {
                    id: newNameValue.toLowerCase().replace(/\s/g, "-"),
                    name: newNameValue,
                    timestamp: new Date(),
                },
            },
        },
        { returnDocument: "after" }
    );
    // doc.value is the updated contest
    res.send( { updatedContest: doc.value } );
});

router.post("/contests/",async (req, res) => {
    const client = await connectClient();
    const { contestName, categoryName, description } = req.body;

    const doc = await client.collection("contests").insertOne({
        id: contestName.toLowerCase().replace(/\s/g,"-"),
        contestName,
        categoryName,
        description,
        names: []
    });
    
    const newContest = await client.collection("contests").findOne({_id: doc.insertedId});
    res.send({newContest});
});

export default router;