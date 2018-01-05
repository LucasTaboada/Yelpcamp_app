var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
/// ALL THE MIDDLEWARE 

var middlewareObj ={};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    
      if(req.isAuthenticated()){
           // does user own the campground?
             Campground.findById(req.params.id, function(err, foundCampground){
               if(err){
                     res.redirect("back");
                }
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                        req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
                     
               });
        } else{
                req.flash("error","You need to be logged in to do that");
            res.redirect("back");
        }
   
}
    
    
middlewareObj.checkCommentOwnership = function checkCommentOwnership(req,res,next){
    
      if(req.isAuthenticated()){
           // does user own the campground?
             Comment.findById(req.params.comment_id, function(err, foundComment){
               if(err){
                     req.flash("error", "Campground not found");
                     res.redirect("back");
                }
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "you don't have permission to do that");
                    res.redirect("back");
                }
                     
               });
        } else{
            req.flash("error","You need to be logged in to do that");
            res.redirect("back");
        }
   
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}





module.exports =  middlewareObj;