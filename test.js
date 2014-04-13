var SIZE = 800;
var DATA = {"name":"bevs","children":[
	          {"name":"tea","size":74},
	          {"name":"whiskey","size":5},
	          {"name":"beer","size":54},
	          {"name":"gatorade","size":1},
	          {"name":"coffee","size":86},
	          {"name":"fanta","size":6},
	          {"name":"wine","size":38}
      		]};

// var bubble = d3.layout.pack()
// 	.sort(null)
// 	.size([SIZE, SIZE])
// 	.padding(1.5);

var svg = d3.select('body')
	.append('svg')
	.attr('width', SIZE)
	.attr('height', SIZE);

function update(data) {
	// var node will be some sort of confusing d3 object, it binds the data with elements of class 'node'
	var node = svg.selectAll('.node')
		.data(data.children, function(d) { return d.name; });  // data.children b/c we're not running var bubble thing
    
    // for every new element, we want to make a new svg circle element, have to give it class 'node' for when we want to update later
	// ENTER
	node.enter().append('circle')
		.attr('class', 'node')
		.attr('r', 0);

	// UPDATE
	node.transition()
		.attr('r', function(d) { return d.size; }) 			//updates size of radius when values change
		.attr('cy', function(d,i) { return 100*i + 100; }) 	// y position
		.attr('cx', 200) 									// x position
		.style('fill', 'gray');

	node.exit()
		.transition()
		.attr('r', 0)
		.remove();
}

update(DATA);

setTimeout(function() {
	DATA.children[0].size = 100; // changes size of tea to 100
	update(DATA);
}, 1000);

setTimeout(function() {
	DATA.children.pop(); 		// removes wine from JSON
	update(DATA);
}, 2000);

setTimeout(function() {
	DATA.children.push({name: "espresso", size: 200}); 		// removes wine from JSON
	update(DATA);
}, 3000);


// node.enter().append('g')
// 	.attr('class', 'node')
// 	.attr('transform', function(d) {return 'translate(' + d.x + ',' + d.y + ')'; });


