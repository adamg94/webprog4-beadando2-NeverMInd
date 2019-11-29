const router = require('express').Router()
const bcrypt = require('bcrypt')

const salt = 10

const User = require('../models/user.model')
const UserSession = require('../models/userSession.model')

router.route('/').get((req, res) => {
    User
        .find()
        .then(Users => res.json(Users))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/add').post((req,res) => {
    let username = req.body.username
    let password1 = req.body.password
    let password2 = req.body.password2
    let regdate = Date.now()
    let lastlogin = Date.now()
    let level = 0

    /**
     * 
     * Level:
     *  1 - Admin
     *  0 - Normal
     */
     User.exists({ username : username }, async (err, doc) => {
         if (err)
         {
             console.log(`Error: ${err}`)
             return
         }
         if(doc)
         {
             res.json({
                 "success" : false,
                 "message" : "User already exists!"
             })
             return
         }

     })
     if(username.length < 4)
     {
         res.json({
         "success" : false,
         "message" : "Username length minimum 4 charachters!"
        })
         return
     }
     if (password1.length === 0 || password2.length === 0)
     {
         res.json({
             "success" : false,
             "message" : "Password length must be greater than 0!"
         })
         return
     }
     if(password1 !== password2)
     {
         res.json({
             "success" : false,
             "message" : "The passwords aren't the same!"
         })
         return
     }
     bcrypt.genSalt(salt, async (err, gotSalt) => {
        if (err)
         {
             console.log(`Error: ${err}`)
             return
         }
         await bcrypt.hash(password1, gotSalt, async (err2, hash) => {
            if (err2)
            {
                console.log(`Error: ${err}`)
                return
            }
            let password = await hash
            const newUser = new User({
                username,
                password,
                regdate,
                lastlogin,
                level
            })
            newUser.save(async(err3, result) => {
                if (err3)
                {
                    console.log(`Error: ${err}`)
                    return
                }
                res.json({
                    "success" : true,
                    "message" : `${result.username} successfully registered!`
                })
            })

         })
     })
})

router.route('/login').post((req, res) => {
    let username = req.body.username
    let password = req.body.password
    let lastlogin = Date.now()
    if(username.length < 4)
     {
         res.json({
         "success" : false,
         "message" : "Username length minimum 4 charachters!"
        })
         return
     }
     if (password.length === 0)
     {
         res.json({
             "success" : false,
             "message" : "Password length must be greater than 0!"
         })
         return
     }
            User.findOne({ username : username },
                 (err2, result) => {
                    if (err2)
                    {
                        console.log(`Error: ${err2}`)
                        return
                    }
                    if(result === null)
                    {
                        res.json({
                            "success" : false,
                            "message" : "User doesn't exist!"
                        })
                        return
                    }
                    bcrypt.compare(password, result.password,
                        (err3, bcrypt_doc) => {
                            if (err3)
                            {
                                console.log(`Error: ${err3}`)
                                return
                            }
                            if(bcrypt_doc)
                            {
                                let Session = new UserSession({
                                    userId : result._id
                                })
                                
                                Session.save((err4, session_doc) => {
                                    if (err4)
                                    {
                                        console.log(`Error: ${err4}`)
                                        return
                                    }
                                    

                                    result.updateOne({
                                        lastlogin : lastlogin
                                    }, (err5, update_doc) => {
                                        if (err5)
                                        {
                                            console.log(`Error: ${err5}`)
                                            return
                                        }
                                        res.json({
                                            "success" : true,
                                            "message" : "Successfully logged in!",
                                            "token" : session_doc._id,
                                            "username" : result.username
                                        })
                                    })
                                })
                            }
                            else
                            {
                                res.json({
                                    "success" : false,
                                    "message" : "Wrong credentials!"
                                })
                            }
                        })
            })
})

router.route('/logout').post((req, res) => {
    const username = req.body.username
    const token = req.body.token
    
    User.findOne({ username : username }, async (err, findone_doc) => {
        
        if (err)
        {
            console.log(`Error: ${err}`)
            return
        }
        if(findone_doc === null)
        {
            res.json({
                "success" : false,
                "message" : "Server error!"
            })
            return
        }
        
        const userId = await findone_doc._id
        
        UserSession.findOne({ userId : userId, isDeleted: false }, async (err2, usession_doc) => {
            if (err2)
            {
                console.log(`Error: ${err2}`)
                return
            }
            
            if(usession_doc === null)
            {
                res.json({
                    "success" : false,
                    "message" : "Server error!"
                })
                return
            }
            
            const sessionToken = await usession_doc._id
            if(sessionToken != token)
            {
                res.json({
                    "success" : false,
                    "message" : "Server error!"
                })
                return
            }
            else
            {
                usession_doc.updateOne({
                    isDeleted : true
                }, (err3, update_doc) => {
                    if (err3)
                    {
                        console.log(`Error: ${err3}`)
                        return
                    }
                    else 
                    {
                        res.json({
                            "success" : true
                        })
                    }

                })
            }

        })
       
    })
    
})

router.route('/verify').post((req, res) => {  
    const username = req.body.username
    const token = req.body.token
    User.findOne({ username : username }, async (err, findone_doc) => {
        if (err)
        {
            console.log(`Error: ${err}`)
            return
        }
        if(findone_doc === null)
        {
            res.json({
                "success" : false,
                "message" : "Server error1!"
            })
            return
        }

        const userId = await findone_doc._id
        const userLevel = await findone_doc.level
        
        UserSession.findOne({ userId : userId, isDeleted : false }, async (err2, usession_doc) => {
            if (err2)
            {
                console.log(`Error: ${err2}`)
                return
            }
            if(usession_doc === null)
            {
                res.json({
                    "success" : false,
                    "message" : "Server error2!"
                })
                return
            }

            const sessionToken = await usession_doc._id
           
            if(sessionToken != token)
            {
                
                res.json({
                    "success" : false,
                    "message" : "Server error3!"
                })
                return
            }
            else
            {
            
                res.json({
                    "success" : true,
                    "level" : userLevel,
                    "token" : sessionToken
                })
                return

            }

        })
       
    })
    
})
module.exports = router