
export default async function ownerOnly(req, res, next) {
    if(req.user.status !== "owner"){
        return res.status(403).json({
            message: "Owner access required"
        });
    }

    next();
}