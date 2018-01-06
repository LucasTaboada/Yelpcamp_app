var express = require("express"),
    router  = express.Router({mergeParams: true}),
 Campground = require("../models/campgrounds"),
    Comment = require("../models/comments"),
 middleWare = require("../middleware"),
     moment = require("moment");




//Comments New
router.get("/new", middleWare.isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//Comments Create
router.post("/",middleWare.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           req.flash("error","Something went wrong");
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               // add username and id to comment
               
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.created = moment().format("MMM Do, h:mm a");
               comment.save();
               // save comment
               campground.comments.push(comment);
               campground.save();
               console.log(comment);
               req.flash("success", "Added comment");
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

/////// Edit comment /campgrounds/:id/comments/:comment_id/edit GET

router.get("/:comment_id/edit",middleWare.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
         res.render("comments/edit",{campground_id: req.params.id,comment:foundComment});
    })
   
});
/// COMMENTS UPDATE
router.put("/:comment_id",middleWare.checkCommentOwnership ,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err,updatedComment){
        if(err){
            res.redirect("back");
        }
        res.redirect("/campgrounds/" + req.params.id);
    })
})

//// COMMENTS DESTROY ROUTE

router.delete("/:comment_id", middleWare.checkCommentOwnership, function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redired("back");
       }
         req.flash("success", "Successfully deleted comment");
       res.redirect("/campgrounds/" + req.params.id);
   })
})


                    
module.exports = router;