var express = require("express"),
 middleWare = require("../middleware"),
 Campground = require("../models/campgrounds"),
    router  = express.Router({mergeParams: true}),
     moment = require("moment");


    
//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
       }
    });
});

//CREATE - add new campground to DB
router.post("/",isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var time = moment().format("MMM do, h:mm a");
    var author ={
        id: req.user._id,
        username: req.user.username};

  
    var newCampground = {name: name, image: image, description: desc, author:author, price:price, created:time}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
       
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new",isLoggedIn ,function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
  
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
        
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleWare.checkCampgroundOwnership,function(req,res){
   
    Campground.findById(req.params.id, function(err,foundCampground){
        res.render("campgrounds/edit",{campground: foundCampground});
    });
    
});
///// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleWare.checkCampgroundOwnership, function(req,res){
    ///find and update the correct campground
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds/" +req.params.id);
    })
})

//////// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleWare.checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
          res.redirect("/campgrounds");
       }
   })
   
})






///// Middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}





module.exports = router;