

export default function me(req, res){
    try {
        return res.status(200).json({
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                status: req.user.status
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur"
        })
    }
}