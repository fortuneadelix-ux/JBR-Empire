import {z} from 'zod'

export const userIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/),
})

export const updateMeSchema = z.object({
    name: z.string()
    .trim()
    .min(2, "le nom doit contenir au moins 2 lettres")
    .max(200, "Le nom ne peut contenir que 200 lettres")

}).strict();

export const updateUserSchema = z.object({
    name: z.string()
    .trim()
    .min(2, "le nom doit contenir au moins 2 lettres")
    .max(100, "Le nom est trop long")
    .optional(),

    isActive: z.boolean().optional()
}).strict()
.refine(
    (data) => Object.keys(data).length > 0,
    { message: "Aucune modification fournie" }
);

export const changePasswordSchema = z.object({
    curPassword: z.string().min(8, "L'ancien mot de passe est requis"),
    newPassword: z.string().min(8, "L'ancien mot de passe est requis").max(128, "Le mot de passe est trop long"),
}).strict()
    .refine(
        (data) => data.currentPassword !== data.newPassword,
        {
        message: "Le nouveau mot de passe doit être différent de l'ancien",
        path: ["newPassword"]
        }
    );

export const changeEmailSchema = z.object({
    newEmail: z.string()
        .trim()
        .email("Adresse email invalide")
        .transform((email) => email.toLowerCase()),

    currentPassword: z.string()
        .min(1, "Le mot de passe actuel est requis")
    }).strict();

export const createUserSchema = z.oject({
    email: z.string().email().trim(),
    name: z.string(),
    isOwner: z.boolean().default(false)
}).strict()