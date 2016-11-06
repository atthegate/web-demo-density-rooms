# web-demo-density-rooms

![Alt text](/assets/screenshots/demo_density_rooms.png?raw=true "Demo Density Rooms")

Demo of a real-time occupancy monitor using density.io... 

Two-part monitor consisting of (i) a floorplan showing occupancy status of each room, and (ii) a grid of room images with occupancy status ribbons.

To run the demo using your own density.io space/sensor setup, you need to do some editing...
<ul>
<li>Edit <i>map.html</i> to add a floorplan in SVG format.</li>
<li>Make sure that each space (room) and sensor in the floorplan has a unique path ID in the SVG.</li> 
<li>Edit <i>demo-density.js</i> to match the space and sensor path/element ID's with their corresponding density.io ID's.</li>
<li>Add a density.io Authorization Token to <i>demo-density.js</i>.
</ul>
