var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
      
      {name:"Clouds Rest", 
      image:"https://www.campsitephotos.com/photo/camp/86410/Mongaup_Pond.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
      },
       {name:"Carolina Beach State Park Campground", 
      image:"https://www.campsitephotos.com/photo/camp/20633/Sunset_Beach_SP_028.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
      },
       {name:"Sunset Bay State Park Campground", 
      image:"https://www.campsitephotos.com/photo/camp/40824/Sunset_Bay_View.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
      },
       {name:"Mongaup Pond Campground", 
      image:"https://www.campsitephotos.com/photo/camp/86410/Mongaup_Pond.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
      },
    
    ];

function seedDB(){

Campground.remove({}, function(err){
    //remove all campgrounds
    if(err){
        console.log(err);
    }else{
        console.log("remove campgrounds!!");
    }
    
//     data.forEach(function(seed){
//         Campground.create(seed,function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("added a campground");
//             //create a comment
             
//         // Comment.create(
//         //     {
                 
//         //          text: "this is a great place, but i wish there was internet",
//         //          author : "Homer"
//         //     }, function(err, comment){
//         //         if(err){
//         //             console.log(err);
//         //         }else{
//         //         campground.comments.push(comment);
//         //         campground.save();
//         //         }
//         //     });
//         };
//       });
//   });

});


}

module.exports = seedDB;
