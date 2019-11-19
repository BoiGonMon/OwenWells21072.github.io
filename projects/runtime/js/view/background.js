var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        var tree;
        var moon;
        var buildings = [];
        // ANIMATION VARIABLES HERE:
        
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'black');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var circle;
                for(var i=0;i<100;i++) {
                    circle = draw.circle(Math.random() * 2,'white','LightGray',2);
                    circle.x = canvasWidth*Math.random();
                    circle.y = groundY*Math.random();
                    background.addChild(circle);
}
             moon = draw.bitmap('https://www.stickpng.com/assets/images/5897ac11cba9841eabab6165.png');
                    moon.x = 100;
                    moon.y = 25;
                    moon.scaleX = 0.5;
                    moon.scaleY = 0.5;
                    background.addChild(moon);
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeight = 300;
            var building;
            for(var i=0;i<5;++i) {
                building = draw.bitmap('https://www.dictionary.com/e/wp-content/uploads/2018/03/Thinking_Face_Emoji-Emoji-Island.png');
                building.x = 500*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
                tree = draw.bitmap('https://www.stickpng.com/assets/thumbs/58486a72849cf46a2a931338.png');
                tree.x = 0;
                tree.y = 0;
                background.addChild(tree);
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1.2;
                if(tree.x < -700) {
                    tree.x = canvasWidth;
            }
            moon.rotation = moon.rotation - 5;
            // TODO 5: Part 2 - Parallax
            for(var i = 0; i < buildings.length; i++){
                var building = buildings[i];
                console.log(building.name);
                building.x = building.x -0.5;
                if(building.x < -200) {
                    building.x = canvasWidth;
                }

            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
