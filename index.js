//fetch data
console.log("Index js running")

const dataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"



fetchData = async () => {

  const response = await fetch(dataUrl)
  const data = await response.json()
  

  console.log(data)



  //const minYr = arrData.reduce((next,curr) => curr.year < next.year ? curr : next).year
  //const maxYr = arrData.reduce((next,curr) => curr.year > next.year ? curr : next).year
  
//   //console.log(arrData)
//   //console.log(minYr,maxYr)

  const colormap = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]
  const categories = data.children.map(c => c.name)  

  console.log(categories)

  const coMap = d3.scaleLinear()
    .domain(categories.map((c,i) => i))
    .range(colormap.slice(0, categories.length))

   // main chart
   const w = 800
   const h = 800
   const padding = 30

  const headings = d3.select('.treemap')
    .append("div")
    .attr("class" ,"headings")
  
  headings
    .append('h2')
    .attr('id', 'title')
    .text(`${data.name}`)
  
  headings
    .append('h3')
    .attr('id', "description")
    .text(`By categories: ${categories.join(' ')} `)


  const svg = d3.select('.treemap')
    .append("div")
    .attr("class", "tiles")
    .append('svg')
    .attr("width", w)
    .attr("height",h)
  
  const root = d3.hierarchy(data)
    .sum(d => d.value)

  console.log(root.leaves())

  d3.treemap()
    .size([w,h])
    .tile(d3.treemapBinary)
    (root)
  
  svg.selectAll("rect")
    .data(root.leaves())
    .join("rect")
    .attr("x", d => d.x0)  
    .attr("y", d => d.y0)
    .attr("width", d => d.x1-d.x0)
    .attr("height", d => d.y1-d.y0)
    .attr("class", "tile")
    .attr("data-name", d => d.data.name)
    .attr("data-value",d => d.data.value)
    .attr("data-category", d => d.data.category)  
    .style("stroke", "black")
    .style("fill", d => coMap(categories.indexOf(d.data.category)))

  svg.selectAll("text")
    .data(root.leaves())
    .join("text")
    .attr("x", d => d.x0+5)
    .attr("y", d => d.y0+15)
    .text(d => d.data.name)
    .attr("font-size", "10px")
    .attr("fill", "white")

  // add  a legend

  const lw = 200
  const lh = 100
  const legSpace = 100

  const legend = d3.select(".treemap")
    .append('div')
    .attr("id", "legend")
    .append('svg')
    .attr("width", w )
    .attr("height", lh )
  
  // select the legend and add items
  const legedItem = legend.selectAll(".legend-item")
    .data(categories)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    
  legedItem  
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", d => coMap(categories.indexOf(d)))
    .attr("x", d => 10 + categories.indexOf(d)*legSpace )
    .attr("y", 10 )
    
  legedItem  
    .append("text")
    .attr("x", d => 32 + categories.indexOf(d)*legSpace )
    .attr("y", 25 )
    .text(d => d)


// // generate array based on the data range and the number of colors
// const thDomainFunc = (min,max,count) => {
//   const arr = [];
//   const step = (max-min)/count;
//   for(var i = 1; i<count; i++){
//     arr.push(min+i*step)
//   } return arr;
// }

// const lArrData = thDomainFunc(minVar,maxVar, colormap.length)


// //legend thresholds, function to map ranges to colors
// const thresholds = d3.scaleThreshold()
//    .domain(lArrData)
//    .range(colormap)

// // legend axes
// const lXScale = d3.scaleBand()
//   .domain(lArrData)
//   .range([0,lw])

// const lXAxis = d3.axisBottom()
//   .scale(lXScale)
//   .tickValues(thresholds.domain())
//   .tickFormat(d3.format('.1f'));

// const legend = chartsvg //append legend to the chart element
//   .append('g')
//   .classed("legend",true)
//   .attr("id", "legend")
//   .attr("transform", "translate(" + padding + "," + (h-padding/2) + ")")
  

// legend
//   .append('g')
//   .selectAll('rect')
//   .data(lArrData)
//   .enter()
//   .append('rect')
//   .style('fill', d => thresholds(d))
//   .attr('x', d => lXScale(d))
//   .attr('y', 0)
//   .attr('height', lh)
//   .attr('width', lXScale.bandwidth)


// legend
//   .append('g')
//   .call(lXAxis)

  


// var tooltip = d3.selectAll("body")
//   .append("div")
//   .attr("id", "tooltip")
  



// // the whole map
// const map = chartsvg
//   .append('g')
//   .classed("map",true)
//   .selectAll('rect')
//   .data(arrData)
//   .enter()
//   .append('rect')
//   .attr('class', 'cell')
//   .attr('data-month', d => d.month-1)
//   .attr('data-year', d => d.year)
//   .attr('data-temp', d=> d.variance+bt)
//   .attr('x', d => xScale(d.year))
//   .attr('y', d => {
//     return yScale(months.find(m => m.no === d.month).name)
//   })
//   .attr('width', d => xScale.bandwidth(d.year))
//   .attr('height', d => yScale.bandwidth(yScale(d.month)))
//   .attr('fill', d => thresholds(d.variance+bt))
  
//   .on("mouseover", (e,d) => {return tooltip.style("visibility", "visible");})
//   .on("mousemove", (e,d) => {
//     return tooltip
//             .style("top", (e.pageY-10)+"px")
//             .style("left",(e.pageX+10)+"px")
//             .attr("data-year", d.year)
//             .html(`
//               <span> ${months.find(m => m.no === d.month).name} ${d.year} </span>
//               </br>
//               <span> Avg temp (${'&#8451'}): ${(d.variance+bt).toFixed(2)}, var ${d.variance.toFixed(2)} 
//             `)
  
//   })
//   .on("mouseout", (e,d) => {return tooltip.style("visibility", "hidden");});


}

fetchData()



