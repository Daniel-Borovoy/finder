const {Router} = require('express')
const User = require('../models/User')
const router = Router()



// /api/auth/login
router.post('/login', async (req, res) =>{
    try {
        console.log(req.body)
        const {userid} = req.body

        

        const candidate = await User.findOne({userid})

        if (candidate){
            return res.status(202).json({message: 'Пользователь проверен'})
        }

        const user = new User({ userid })

        await user.save()

        res.status(201).json({message: 'Пользователь создан'})


    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        console.log(e)
        console.log(req.body)
    }
})

module.exports = router