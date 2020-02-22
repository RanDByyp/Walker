var Metro = {
    
    //Create empty array for counters and countersIncrement to be used for animation
    counters: new Array(),
    countersIncr: new Array(),

    //Call this function in 'sketch.js > setup()'
    initialize: function(width, height, cellSize, steps, dirAmount, color)
    {
        //Create new path and add it to the end of myPaths[]
        let path = new Path(width, height, cellSize, steps, dirAmount, color);

        //Create new (animation) counter and add it to the end of counters[]
        this.counters.push (0);
        //Create new (animation) counterIncrement and add it to the end of countersIncr[]
        this.counters.push(1);

        //Set Origin Coordinates for path
        let goal = new Array(2);
        path.path[0][0] = path.gridWidth / 2;
        path.path[0][1] = path.gridHeight / 2;

        //Generate a path for X amount of steps
        for(let i = 0; i < path.steps-1; i++)
        {
            goal = Walker.getGoal(1,path.gridWidth-1,1,path.gridHeight-1,path.dirAmount,path.path[i][0],path.path[i][1]);
            path.path[i+1][0] = goal[0];
            path.path[i+1][1] = goal[1];
        }
        return path;
    },

    //Call this function in 'sketch.js > draw()'
    drawStatic: function(path,color)
    {
        let p = path;
        
        //Draw current path(p) fully
        for(let i = 0; i < myPaths[p].steps - 1; i++)
        {
            noFill();
            stroke(color);
            circle(myPaths[p].path[i][0]*myPaths[p].cellSize,myPaths[p].path[i][1]*myPaths[p].cellSize, myPaths[p].cellSize / 4);
        }
        //Run 'sketch.js > draw()' once
        noLoop();
    },

    //Call this function in 'sketch.js > draw()'
    drawAnimate: function(path, color) 
        {
            let p = path;

            //Draw part of path from origin[0] to counter value
            for(let i = 0; i < this.counters[p]; i++)
            {
                noFill();
                stroke(color);
                circle(myPaths[p].path[i][0]*myPaths[p].cellSize,myPaths[p].path[i][1]*myPaths[p].cellSize, myPaths[p].cellSize / 4);
            }

            //If path is not-drawn
            if (this.counters[p] <= 0) 
            {
                //Set new color to current path
                myPaths[p].color = Math.floor(Math.random() * 255) + 55;

                //Regenerate current path (Create new coordinates with same stepSize)
                for(let i = 0; i < myPaths[p].steps-1; i++)
                {
                    goal = Walker.getGoal(1,myPaths[p].gridWidth-1,1,myPaths[p].gridHeight-1,myPaths[p].dirAmount,myPaths[p].path[i][0],myPaths[p].path[i][1]);
                    myPaths[p].path[i+1][0] = goal[0];
                    myPaths[p].path[i+1][1] = goal[1];
                }

                //Set Increment of part-of-path counter to +1
                this.countersIncr[p] = 1;
            }
            //If path is fully drawn
            else if (this.counters[p] >= myPaths[p].steps -1)
            {
                //Set Increment of part-of-path counter to -1
                this.countersIncr[p] = -1;
            }
            
            //Increase/decrease part-of-path to draw
            this.counters[p] += this.countersIncr[p];
        }
}