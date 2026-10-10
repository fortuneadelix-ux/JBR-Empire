import { loginSchema, registerSchema } from "../../schemas/authSchema/authSchema.js"
import User from "../../models/authmodels/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function login (req, res){
    try {
        const validation = loginSchema.safeParse(req.body);
        if(!validation.success){
            return res.status(400).json({
                message: "Veuillez remplir tous les champs",
                errors: validation.error.issues
            })
        }

        const {email, password} = validation.data;
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({
                message: "email incorrect. Veuillez rééssayer"
            })
        }
        if(!user.isActive){
            return res.status(400).json({
                message: "Vous ne faites plus parties des membres de JBR Empire"
            })
        }
        if(password.length < 8){
            return res.status(401).json({
                message: "le mot de passe doit contenir au moins 8 caractères"
            })
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if(!passwordValid){
            return res.status(401).json({
                message: "mot de passe incorrect. Veuillez rééssayer"
            })
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_CODE, {expiresIn: "7d"})

        return res.status(200).json({
            message: "Connexion réussie",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status,
                isActive: user.isActive
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erreur dans la création de l'uilisateur",
            Error: error
        })
    }
}

export async function register (req, res){
    try {
        const validation = registerSchema.safeParse(req.body);
        if(!validation.success){
            return res.status(400).json({
                message: "invalid inputs",
                errors: validation.error.issues
            })
        }

        const {email, password, name, isOwner} = validation.data;
        const status = isOwner ? "owner" : "employee";
        
        //Check if the email already exists
        if(await User.findOne({ email })){
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nvUser = await User.create({
            name,
            email,
            password: hashedPassword,
            status
        })

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: nvUser._id,
                name: nvUser.name,
                email: nvUser.email,
                status: nvUser.status,
                isActive: nvUser.isActive
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error when creating user",
            Error: error
        })
    }
}