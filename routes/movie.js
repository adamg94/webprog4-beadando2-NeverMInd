const router = require('express').Router()
const name_pattern = /[A-őA-Ő0-9:.-\s]*[^\\|€÷×\[\]ł$¤<ˇ^˘°˛~>#&@{}(),;?_*+/]/ //kicsit lehet szigorú regex
const Movie = require('../models/movie.model')

router.route('/').get((req, res) => {
    Movie
        .find()
        .then(Movies => res.json(Movies))
        .catch(err => res.status(400).json(`Error: ${err}`))
})


router.route('/:id').get((req, res) => {
    Movie
        .findById(req.params.id)
        .then(Movies => res.json(Movies))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.route('/delete/:id').post((req, res) => {
    const id = req.params.id
    Movie.findById({ _id : id }, (err, doc1) => {
        if (err)
        {
            console.log(`Error1: ${err}`)
            return
        }
        if(doc1)
        {
           Movie.deleteOne({_id : id}, (err2, dinfo) => {
            if (err2)
            {
                console.log(`Error1: ${err2}`)
                return
            }
            res.json({
                "success" : true,
                "message" : `The Movie ${doc1.name} Deleted!`
            })
            return

           })
            
        }
        else{
            res.json({
                "success" : false,
                "message" : `The Movie doesn't exist!`
            })
            return
        }
    })
})


router.route('/update').post((req, res) => {
    let title = req.body.title
    const id = req.body.id
    let imdb = parseFloat(req.body.imdb)
    let rdate = new Date(req.body.rdate)
    let mlength = parseInt(req.body.mlength)
    let director = req.body.director
    let writer = req.body.writer
    let stars = req.body.stars.trim()
    
    Movie.exists({ _id : id }, (err, doc1) => {
        if (err)
        {
            console.log(`Error1: ${err}`)
            return
        }
        if(!doc1)
        {
           
            res.json({
                "success" : false,
                "message" : "Movie doesn't exists!"
            })
            return
        }
    })

    // regex alapján kigyűjteni a megadott stringből azt amit el kell fogadni. 

    let title_regexing = title.match(name_pattern).map(c => c.trim())
    title_regexing.map( a => a == "" ? title_regexing.splice(title_regexing.indexOf(a),1) : a.trim() )

    
    if (title_regexing.length < 1)
    {
       
        res.json({
            "success" : false,
            "message" : "Title must be at least 1 chachter excluding special ones!"
        })
        return
    }

    if (imdb < 0 || imdb > 10)
    {
       
        res.json({
            "success" : false,
            "message" : "IMDB Score closed interval: [0.0,10.0]"
        })
        return
    }

    if(rdate.getFullYear() < 1900 || Date.parse(rdate) > Date.now())
    {
        
        
        res.json({
            "success" : false,
            "message" : "Release date must be greater than 1899.12.31 and can't be in the future!"
        })
        return
    }
    
    if(mlength < 1 || mlength > 51420)
    {
        
        //https://en.wikipedia.org/wiki/List_of_longest_films
        res.json({
            "success" : false,
            "message" : "Length can't be lower than zero and there is no film which longer than 51420 minutes!"
        })
        return
    }

    let director_regexing = director.match(name_pattern).map(c => c.trim())
    director_regexing.map( a => a == "" ? director_regexing.splice(director_regexing.indexOf(a),1) : a.trim() )

    
    if(director_regexing < 1)
    {
    
        res.json({
            "success" : false,
            "message" : "Director is empty!"
        })
        return
    }
    
    let writer_regexing = writer.match(name_pattern).map(c => c.trim())
    writer_regexing.map( a => a == "" ? writer_regexing.splice(writer_regexing.indexOf(a),1) : a.trim() )
    
    if(writer_regexing < 1)
    {
       
        res.json({
            "success" : false,
            "message" : "Writer is empty!"
        })
        return
    }
    
    let stars_regexing = stars.match(name_pattern).map(c => c.trim())
    stars_regexing.map( a => a == "" ? stars_regexing.splice(stars_regexing.indexOf(a),1) : a.trim() )


    if(stars_regexing < 1)
    {
       
        res.json({
            "success" : false,
            "message" : "Stars is empty!"
        })
        return
    }
    const newMovie = {
        name : title_regexing.toString(),
        creation_date : rdate,
        imdb_points : imdb,
        length_in_minutes : mlength,
        director : director_regexing.toString(),
        writer : writer_regexing.toString(),
        stars : stars_regexing.toString()
    }
    Movie.findOne({ _id : id }, (err, doc1) => {
        if (err)
        {
            console.log(`Error1: ${err}`)
            return
        }
        if(doc1)
        {
           
            doc1.updateOne(newMovie, (err2,mdoc) => {
                if (err2)
                    {
                        
                        console.log(`Error2: ${err2}`)
                        res.json({"success" : false, "message" : `Server Error!`})
                        return
                    }
                    
                res.json({"success" : true, "message" : `The Movie: ${doc1.name} Updated!`})
                return
            })
        }
    })

})

router.route('/add').post((req, res) => {
    let title = req.body.title
    let imdb = parseFloat(req.body.imdb)
    let rdate = new Date(req.body.rdate)
    let mlength = parseInt(req.body.mlength)
    let director = req.body.director
    let writer = req.body.writer
    let stars = req.body.stars.trim()
    
    Movie.exists({ name : title }, (err, doc1) => {
        if (err)
        {
            console.log(`Error1: ${err}`)
            return
        }
        if(doc1)
        {
           
            res.json({
                "success" : false,
                "message" : "Movie already exists!"
            })
            return
        }
    })

    // regex alapján kigyűjteni a megadott stringből azt amit el kell fogadni. 

    let title_regexing = title.match(name_pattern).map(c => c.trim())
    title_regexing.map( a => a == "" ? title_regexing.splice(title_regexing.indexOf(a),1) : a.trim() )

    
    if (title_regexing.length < 1)
    {
       
        res.json({
            "success" : false,
            "message" : "Title must be at least 1 chachter excluding special ones!"
        })
        return
    }

    if (imdb < 0 || imdb > 10)
    {
       
        res.json({
            "success" : false,
            "message" : "IMDB Score closed interval: [0.0,10.0]"
        })
        return
    }

    if(rdate.getFullYear() < 1900 || Date.parse(rdate) > Date.now())
    {
        
        
        res.json({
            "success" : false,
            "message" : "Release date must be greater than 1899.12.31 and can't be in the future!"
        })
        return
    }
    
    if(mlength < 1 || mlength > 51420)
    {
        
        //https://en.wikipedia.org/wiki/List_of_longest_films
        res.json({
            "success" : false,
            "message" : "Length can't be lower than zero and there is no film which longer than 51420 minutes!"
        })
        return
    }

    let director_regexing = director.match(name_pattern).map(c => c.trim())
    director_regexing.map( a => a == "" ? director_regexing.splice(director_regexing.indexOf(a),1) : a.trim() )

    
    if(director_regexing < 1)
    {
    
        res.json({
            "success" : false,
            "message" : "Director is empty!"
        })
        return
    }
    
    let writer_regexing = writer.match(name_pattern).map(c => c.trim())
    writer_regexing.map( a => a == "" ? writer_regexing.splice(writer_regexing.indexOf(a),1) : a.trim() )
    
    if(writer_regexing < 1)
    {
       
        res.json({
            "success" : false,
            "message" : "Writer is empty!"
        })
        return
    }
    
    let stars_regexing = stars.match(name_pattern).map(c => c.trim())
    stars_regexing.map( a => a == "" ? stars_regexing.splice(stars_regexing.indexOf(a),1) : a.trim() )


    if(stars_regexing < 1)
    {
       
        res.json({
            "success" : false,
            "message" : "Stars is empty!"
        })
        return
    }
    const newMovie = new Movie({
        name : title_regexing.toString(),
        creation_date : rdate,
        imdb_points : imdb,
        length_in_minutes : mlength,
        director : director_regexing.toString(),
        writer : writer_regexing.toString(),
        stars : stars_regexing.toString()
    })
    
    newMovie.save((err2,mdoc) => {
        if (err2)
            {
                
                console.log(`Error2: ${err2}`)
                res.json({"success" : false, "message" : `Server Error!`})
                return
            }
            
        res.json({"success" : true, "message" : `The Movie: ${mdoc.name} Inserted!`})
        return
    })
})
module.exports = router