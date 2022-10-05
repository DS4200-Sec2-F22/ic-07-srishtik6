/*
ic-07
*/
const FRAME_HEIGHT = 900;
const FRAME_WIDTH = 550;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const data1 = [55000, 48000, 27000, 66000, 90000]; 
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME3 = d3.select("#vis")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

const MAX_Y = d3.max(data1, (d) => { return d; }); 

// Now, define scale functions that maps our data values 
// (domain) to pixel values (range)
const Y_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, MAX_Y]) // add some padding  
                  .range([0, VIS_HEIGHT]); 

// Now, we can use Y_SCALE to plot our points
FRAME3.selectAll("points")  
    .data(data1)  
    .enter()       
    .append("circle") 
      .attr("cx", (2 * MARGINS.left)) 
      .attr("cy", (d) => { return (Y_SCALE(d) + MARGINS.top); }) 
      .attr("r", 20)
      .attr("class", "point"); 

FRAME3.append('g') 
        .attr('transform', "translate(" + 2* MARGINS.left +"," + (MARGINS.top) +")") // transform can transalte things by whatever you tell it, we want over a bit on x and down by top margin and visheight
        .call(d3.axisLeft(Y_SCALE).ticks(4))
            .attr('font-size', '20px');
