import User from '../models/authmodels/user.js'
import { updateMeSchema, updateUserSchema, userIdSchema, createUserSchema } from '../schemas/userCrudSchema.js';

export async function getAllUsers(req, res){
    try {
            const usersList = await User.find().select('-password');    
            return res.status(200).json({
                usersList
            })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erreur lors de la récupération des utilisateurs'
        })
    }

}

export async function getUser(req, res) {
    try {
        const validation = userIdSchema.safeParse(req.params);

        if (!validation.success) {
        return res.status(400).json({
            message: "Identifiant utilisateur invalide",
            errors: validation.error.issues
        });
        }
        const user = await User.findById(validation.data.id)
        .select("-password");

        if(!user){
            return res.status(404).json({
                message: "Aucun utilisateur avec cet id"
            })
        }

        return res.status(200).json({
            message: 'Utilisateur retrouvé',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                status: user.status,
                isActive: user.isActive
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Erreur lors de la recherche de l\'utilisateur',
            error: error
        })
    }
}

export async function updateMe(req, res){
    try {
        const validation = updateMeSchema.safeParse(req.body);
        if(!validation.success){
            return res.status(400).json({
                message: "Entrez le nom de l'utilisateur",
                error: validation.error.issues
            })
        }

        const {name} = validation.data;
        const user = req.user;
        if(!user){
            return res.status(404).json({
                message: 'Aucun utilisateur avec cet id'
            })
        }
        user.name = name;
        await user.save();
        return res.status(200).json({
            message: "Profil modifié avec succès",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status,
                isActive: user.isActive
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Erreur lors de la modification du profil',
            error: error
        })
    }

}

export async function updateUser(req, res) {
    try {
        const validation = updateUserSchema.safeParse(req.body);
        if(!validation.success){
            return res.status(400).json({
                message: "Entrez le nom et/ou l'actif ou non de l'utilisateur",
                error: validation.error.issues
            })
        }

        const {name, isActive} = validation.data;
        const paramsValidation = userIdSchema.safeParse(req.params);
        if(!paramsValidation.success){
            return res.status(400).json({
                message: "id invalide",
                error: paramsValidation.error.issues
            })
        }
        const { id } = paramsValidation.data

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message: 'Aucun utilisateur avec cet id'
            })
        }
        user.name = name === undefined ? user.name : name ;
        user.isActive = isActive ?? user.isActive
        await user.save();
        return res.status(200).json({
            message: "Profil modifié avec succès",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status,
                isActive: user.isActive
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Erreur lors de la modification du profil',
            error: error
        })
    }
}

export async function changePassword(req, res){

}

export async function changeEmail(req, res) {
    
}


export async function createUser(req, res) {
    const validation = createUserSchema.safeParse(req.body);
    if(!validation.success){
            return res.status(400).json({
                message: "Entrez le nom et/ou l'actif ou non de l'utilisateur",
                error: validation.error.issues
            })
        }

    const {name, email, isOwner} = validation.data
    if(!name || !email ||isOwner){
        return res.status(404).json({
            message: 'Remplissez tous les champs'
        })
    }
    if(User.findOne({ email })){
        return res.status(409).json({
            message: 'Un utilisateur existe déjà avec cet email'
        })
    }
    await User.create()
}