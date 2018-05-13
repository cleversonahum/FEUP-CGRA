/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI / 180.0;
class MyVehicle extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.scene = scene;
		this.initBuffers();
	};

	initBuffers() 
	{
		
		this.position = [0,0,0];

		this.wheel = new Wheel(this.scene);
		
		this.sphere = new Sphere(this.scene, 20,30);

		this.trapeze = new MyTrapeze(this.scene, 0 , 2 , 0.5 , 1.5, 1);

		this.cylinder = new MyCylinder(this.scene,12,12);

		this.quad = new MyQuad(this.scene);
		this.vertices = [];

		this.indices = [];

		this.wheelPosition = 0; //variation from -90 (left) to 90 (right)
		this.velocity = 0; //Vehicle velocity from -50 (back) to 50(front)
		this.wheelRotation = 0; //Wheel Rotation from -2*pi to 2*pi
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	turnWheels(direction) {
		var maxAngle = 45; //Max inclination angle
		var turnAngle = 1; //Turn Angle in each interation
		var stabilizeAngle = 0.5; //Angle to stabilize wheels

		console.log("Angle: " + this.wheelPosition);
		if(direction=="l" && this.wheelPosition<maxAngle ) //Left
			this.wheelPosition += turnAngle;
		else if(direction=="r" && this.wheelPosition>(-maxAngle))//Right
			this.wheelPosition -= turnAngle;
		else if(direction=="s" && this.wheelPosition<=(maxAngle) && this.wheelPosition>0) //Stabilize from Right
			this.wheelPosition -= stabilizeAngle;
		else if(direction=="s" && this.wheelPosition>=(-maxAngle) && this.wheelPosition<0) //Stabilize from Left
			this.wheelPosition += stabilizeAngle;
	}

	moveWheels(direction) {
		var maxVelocity = 10; //Max value to velocity
		var maxRotation = 360; 
		var rotation = 2*this.velocity; //Max rotation to each interation
		var acceleration = 1; //Value to acceleration (increase velocity)

		if(direction=="f" && this.velocity<maxVelocity) //Increase Velocity
				this.velocity += acceleration;

		else if(direction=="b" && this.velocity>(-maxVelocity)) //Decrease Velocity
			this.velocity -= acceleration;


		this.wheelRotation += rotation;

		if(this.wheelRotation>(maxRotation))
			this.wheelRotation = 0;
		else if(this.wheelRotation<(-maxRotation))
			this.wheelRotation = 0;

		console.log("Rotação : "+this.wheelRotation);
		console.log("Velocidade : "+this.velocity);
	}


	display()
	{
		//Moving Car
		//this.scene.translate(4,0,0);

		//chassis
		this.scene.pushMatrix(); //comprimento 4.5  largura 2.5
		this.scene.rotate( -Math.PI/2, 1,0,0);
		this.scene.scale(4.5,2.5,1);
		//this.scene.translate(0,0,2);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(-2.5,0,2.5);
		this.scene.rotate(degToRad*this.wheelPosition,0,1,0); //Turn Left/Right
		this.wheel.display(); //roda1
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(2.5,0,2.5);
		this.wheel.display(); //roda 2
		this.scene.popMatrix();
			
		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(-2.5,0,-3.5);
		this.scene.rotate(degToRad*this.wheelPosition,0,1,0); //Turn Left/Right
		this.scene.rotate(degToRad*this.wheelRotation, 0,0,1); //Rotate
		this.wheel.display(); // roda 3 
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(2.5,0,-3.5);
		this.wheel.display();  // roda4
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(2.5,0.7,1);
		this.scene.translate(0,0.5,2.25);
		this.quad.display();  // para choques
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(3*Math.PI/2,0,1,0);
		this.scene.scale(2.5,0.7,1);
		this.scene.translate(0,0.5,2.25);
		this.quad.display();  // traseira
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(4.5,0.7,1);
		this.scene.translate(0,0.5,1.25);
		this.quad.display();  // lateral 1
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(4.5,0.7,1);
		this.scene.translate(0,0.5,1.25);
		this.quad.display();  // lateral 1
		this.scene.popMatrix();

		this.scene.pushMatrix(); //comprimento 4.5  largura 2.5
		this.scene.rotate( -Math.PI/2, 1,0,0);
		this.scene.scale(4.5,2.5,1);
		this.scene.translate(0,0,0.7);
		this.quad.display();
		this.scene.popMatrix();
		
		
		this.scene.pushMatrix();
		//this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1.8,1,2.5);
		this.scene.translate(-0.74,0.7,-0.5);
		this.trapeze.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/3,1/3,1/3);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(1.05,6.67,2);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/3,1/3,1/3);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(1.05,6.67,-2);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1/8,1/8,1/3);
		this.scene.translate(5,1.1,6.7);
		this.cylinder.display();
		this.scene.popMatrix();


	}
};
