
import { connect } from "http2"

const handler = async (req, res) => {
    if(req.method === 'POST') {
        console.log(req.body)
        // const { email, password } = req.body
        // Do stuff with email and password
        res.status(200).json({ status: 'success' })
    }
    else {
        res.status(400).json({ error: 'This method is not allowed' })
    }
}

export default connectDb(handler);

exp