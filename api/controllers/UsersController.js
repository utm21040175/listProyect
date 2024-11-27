//inscribir a eventos (Lider)
//ver info del evento (equipos) -> jueces, status, participantes, equipos, ronda 
//ver calificaciones del equipo
//ver info del equipo

import { UserModel } from "../models/UserModel.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken"


//iniciar sesion 
//registrarse
//Actualizar perfil 

export default {
    register : async (req, res)=>{
        try {
            const hash = await bcrypt.hash(req.body.password, 10);
            const user = {
                name :req.body.name,
                password : hash,
                email : req.body.email,
                CURP : req.body.CURP,
                rol : req.body.rol
            };
            await UserModel.create(user);
            res.status(200).json({msg : "USUARIO REGISTRADO "});
            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg : "El usuario no fue registrado correctamente"});
        }
    },
    login : async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

        if(!email || !password){
            return res.status(400).json({msj : "Parametros incorrectos "})
        } 
        
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({msj : "Usuario no encontrado"})
        }
         
        if(!bcrypt.compare(password, user.password)){
            return res.status(400).json({msj : "Usuario no encontrado"})
        }

        //crear un token
        const token = await jwt.sign(JSON.stringify(user), process.env.PRIVATE_KEY);
        return res.status(200).json({token})

        } catch (error) {
            res.status(500).json({msg : "El usuario no fue registrado correctamente"});
            console.log(error)
        }
    },
    upadateProfile : async(req, res)=>{
       try {
        const user = await UserModel.findById(req.params.id);
        if (!user ){
            return res.status(400).json({msj : "Usuario no encontrado"})
        }
        user.name = req.body.name ? req.body.name : user.name;
        user.password = req.body.password ? await bcrypt.hash(req.body.password, 10) : user.password;
        user.CURP = req.body.CURP ? req.body.CURP : user.CURP;
        user.email = req.body.email ? req.body.email: user.email;

        await UserModel.findByIdAndUpdate(user._id, user);
        return res.status(200).json({msj : "PERFIL ACTUALIZADO"})
       } catch (error) {
            console.log(error)
            res.status(500).json({msg : "El usuario no fue registrado correctamente"});
       }
    }
}