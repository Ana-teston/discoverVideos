import jwt from "jsonwebtoken";

export default async function stats(req, res) {
    try {
        const token = req.cookies.token;
        if (req.method === "POST") {
            console.log({cookies:req.cookies});
            if (!token) {
                res.status(403).send({});
            } else {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                console.log({decoded});
                res.send({msg: "it work", decoded})
            }
        }
    } catch (error) {
        console.log("error occurred / status", error);
        res.status(500).send({done: false, error: error?.message});
    }
}