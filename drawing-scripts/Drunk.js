var Drunk = {

    //Create empty array for counters to be used for animation
    counters: new Array(),

    /**
    * Initialize Drunk
    * @param {int} boundsMinX - The 'lowest x coordinate' allowed to draw in 
    * (Should not be lower than 0).
    * @param {int} boundsMaxX - The 'highest x coordinate' allowed to draw in 
    * (Should not be higher than canvas width).
    * @param {int} boundsMinY - The 'lowest y coordinate' allowed to draw in 
    * (Should not be lower than 0).
    * @param {int} boundsMaxY - The 'highest y coordinate' allowed to draw in 
    * (Should not be higher than canvas height).
    * @param {int} cellSize - The width and height of grid-cells 
    * (Should be a power of 2).
    * @param {int} steps - The desired length (Amount of cells) of the path.
    * @param {int} dirAmount - The amount of directions to randomly choose from 
    * (Should be '4' or '8') 
    * (If '4', returns a direction of (0,90,180 or 270)), 
    * (If '8', returns a direction of (0,45,90,135,180,225,270 or 315))
    * @param {bool} onlyDiag - Constrict the path to only pick diagonal directions. 
    * (If 'true', overrides 'dirAmount')
    * @param {color} color - The desired color of the path. 
    * (Should be any of these formats: 255 , '#FF0000' , 'red' , 'hsl(0, 100%, 50%)' , 'rgb(255, 0, 0)' )
    */
    //Call this function in 'sketch.js > setup'
    initialize: function(boundsMinX, boundsMaxX, boundsMinY, boundsMaxY, cellSize, steps, dirAmount, onlyDiag, color)
    {
        //Create new path.
        let p = new Path(boundsMinX, boundsMaxX, boundsMinY, boundsMaxY, cellSize, steps, dirAmount, onlyDiag, color);

        //Create new (animation) counter and add it to the end of counters[]
        this.counters.push (0);

        //Set Origin Coordinates for path
        let goal = new Array(2);
        p.path[0][0] = p.boundsMaxX / 2;
        p.path[0][1] = p.boundsMaxY / 2;

        //Generate X amount of steps(coordinates) for path
        for(let i = 0; i < p.steps-1; i++)
        {
            goal = p.getGoal(p.boundsMinX,p.boundsMaxX,p.boundsMinY,p.boundsMaxY,p.dirAmount,p.onlyDiag,p.path[i][0],p.path[i][1],p.cellSize);
            p.path[i+1][0] = goal[0];
            p.path[i+1][1] = goal[1];
        }
        return p;
    },

    /**
    * Draw Drunk fully without Animation 
    * @param {Object} path - The path to draw. 
    * @param {Color} color - The desired color of the path's steps. 
    * (Should be any of these formats: 255 , '#FF0000' , 'red' , 'hsl(0, 100%, 50%)' , 'rgb(255, 0, 0)' )
    */   
    //Call this function in 'sketch.js > draw()'
    drawStatic: function(path,color)
    {
        let p = path;

        //Draw current path(p) fully
        for(let i = 0; i < myPaths[p].steps - 1; i++)
        {
            stroke(color);
            line(myPaths[p].path[i][0],myPaths[p].path[i][1],myPaths[p].path[i+1][0],myPaths[p].path[i+1][1]);
        }
        //Run 'sketch.js > draw()' once
        noLoop();
    },

    /**
    * Draw Drunk Animated
    * @param {Object} path - The path to draw. 
    * @param {Color} color - The desired color of the path's steps. 
    * (Should be any of these formats: 255 , '#FF0000' , 'red' , 'hsl(0, 100%, 50%)' , 'rgb(255, 0, 0)' )
    */   
    //Call this function in sketch.js
    drawAnimate: function(path, color) 
    {
        {
            let p = path;
            
            //Draw part of path from origin[0] to counter value
            for(let i = 0; i < this.counters[p]; i++)
            {
                stroke(color);
                line(myPaths[p].path[i][0],myPaths[p].path[i][1],myPaths[p].path[i+1][0],myPaths[p].path[i+1][1]);
            }

            //If path is not fully drawn
            if (this.counters[p] < myPaths[p].steps -1) 
            {
                this.counters[p]++;
            }
        };
    },

    /**
    * Draw Drunk Bounds  
    * @param {Object} path - The path to draw bounds for.
    * @param {Color} color - The desired color of the bounds. 
    * (Should be any of these formats: 255 , '#FF0000' , 'red' , 'hsl(0, 100%, 50%)' , 'rgb(255, 0, 0)' )
    */   
    //Debugging tool: Draws drawing-bounds to canvas.
    drawBounds: function(path, color)
    {
        stroke(color);
        noFill();
        rect(myPaths[path].boundsMinX,myPaths[path].boundsMinY,myPaths[path].boundsMaxX-myPaths[path].boundsMinX,myPaths[path].boundsMaxY-myPaths[path].boundsMinY);
    }
}