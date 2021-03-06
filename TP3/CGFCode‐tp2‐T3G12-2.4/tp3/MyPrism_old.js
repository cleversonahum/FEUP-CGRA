/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices =[];

		this.indices = [];

		this.normals = [];

		var angle = (360/this.slices) * (Math.PI/180);
		var distance_stacks = 1.0/this.stacks;

		//Making vertices
		for(var j = 0; j<2; j++) { //2 Vertices declared
			for(var k = 0; k<this.stacks; k++) { //Number of Stacks
				for(var i = 0; i<this.slices;i++) { //Front
					this.vertices.push(Math.cos(angle*i), Math.sin(angle*i), (-0.5 + k*distance_stacks));	
				}

				for(var i = 0; i<this.slices;i++) { //Back
					this.vertices.push(Math.cos(angle*i), Math.sin(angle*i), (-0.5 + k*distance_stacks+distance_stacks));			
				}

				console.log("K: "+ k);
			}
		}

		//Making indices
		for(var k = 0; k<this.stacks; k++) { //Number of stacks
			for(var i = 0; i<this.slices; i++) {
				console.log(i);
				if(i!=(this.slices-1)) {
					this.indices.push(i +(this.slices*2*k), i+1+this.slices+(this.slices*2*k), i+1+(this.slices*2*k)); //anticlockwise
					this.indices.push(i+1+(this.slices*2*k), i+1+this.slices+(this.slices*2*k), i+(this.slices*2*k)); //clockwise
					this.indices.push(i+(this.slices*2*k), i+this.slices+(this.slices*2*k), i+1+this.slices+(this.slices*2*k)); //anticlockwise
					this.indices.push(i+1+this.slices+(this.slices*2*k), i+this.slices+(this.slices*2*k), i+(this.slices*2*k));
				}
				else {
					this.indices.push(i+(this.slices*2*k), i+1+(this.slices*2*k), 0+(this.slices*2*k)); //anticlockwise
					this.indices.push(0+(this.slices*2*k), i+1+(this.slices*2*k), i+(this.slices*2*k)); //clockwise
					this.indices.push(i+(this.slices*2*k), i+this.slices+(this.slices*2*k), i+1+(this.slices*2*k)); //anticlockwise
					this.indices.push(i+1+(this.slices*2*k), i+this.slices+(this.slices*2*k), i+(this.slices*2*k)); //clockwise
				}

			}
		}

		console.log(this.vertices);
		console.log("IND: "+this.indices);

		function mean(x,y) {
                	return ((x+y)/2.0);
        	};

		//Making Normals
		for (var i = 0; i<(this.vertices.length/2); i+=3) { //Mean of A and B makes a normal to A
			this.normals.push(mean(this.vertices[i], this.vertices[i+3]), mean(this.vertices[i+1], this.vertices[i+4]), mean(this.vertices[i+2], this.vertices[i+5])); 
		}

		
		console.log(this.normals);

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};


};
