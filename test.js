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

var color = d3.scale.category10();

var bubble = d3.layout.pack()
	.sort(null)								 // arranged in the order given
	.size([SIZE, SIZE])
	.padding(1.5)
	.value(function(d) { return d.size; } ); // pack layout expects "value" but JSON stores this as "size", this returns size wherever value is called

var svg = d3.select('body')
	.append('svg')
	.attr('width', SIZE)
	.attr('height', SIZE);

function update(data) {

	// returns all the leaf nodes, throw out ones that have chidren (in this case BEVs)
	var data = bubble.nodes(data).filter(function(d) { return !d.children; });				

	// var node will be some sort of confusing d3 object, it binds the data with elements of class 'node'
	var node = svg.selectAll('.node')
		.data(data, function(d) { return d.name; }) // data.children b/c we're not running var bubble thing

    // for every new element, we want to make a new svg circle element, have to give it class 'node' for when we want to update later

	// ENTER
	var enter = node.enter().append('g')
		.attr('class', 'node')
		.attr('transform', function(d) {return 'translate(' + d.x + ',' + d.y + ')'; });

	enter.append('circle')
		.attr('r', 0)											// start elements with radius of 0 to watch them grow using transition
		.style('fill', function(d) { return color(d.name); });	// color elements when the enter as color won't change
	enter.append('text')
		.style('opacity', 0)
		.style('fill', 'black')
		.style('text-anchor', 'middle')
		.text(function(d) { return d.name; });


	// UPDATE
	var update = node.transition()
		.attr('transform', function(d) {return 'translate(' + d.x + ',' + d.y + ')'; });

	update.select('circle')
			.attr('r' , function(d) { return d.r; });	 		// updates size of radius when values change
	update.select('text')
			.style('opacity', 1);

	// EXIT
	var exit = node.exit()
		.transition()
			.remove();
	exit.select('circle').attr('r', 0);
	exit.select('text').style('opacity', 0);

}

update(DATA);


// this is just to prove that the animations will update, feel free to delete these when actually using this code

setTimeout(function() {
	DATA.children[0].size = 100; 						// changes size of tea to 100
	update(DATA);
}, 1000);

setTimeout(function() {
	DATA.children.pop(); 								// removes wine from JSON
	update(DATA);
}, 2000);

setTimeout(function() {
	DATA.children.push({name: "wine", size: 100}); 		// adds wine back
	update(DATA);
}, 3000);


