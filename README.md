# Earthqueakes map

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To start the project

In the project directory, you can run:
### `npm isntall`
### `npm start`

## To run tests

### `npm test`

## Considerations

- Mapbox is used to render the map
- The mapbox token is added as an env variable in the .env file in the root directory
- The date selector can be hidden to better display the map, a transition has been added to the date selector when display/hide
- The map markers can have two different states: reviewed and automatic, two different images will be rendered for that:
**In map.js red icon for automatic status and blue for reviewed**
`

				map.loadImage(logo, (error, image) => {
					map.loadImage(redLogo, 
					`...`
					map.addLayer({
						`...`
							'icon-image': [
								'match',
								['get', 'status'],
								'reviewed',
									'neutral',
								'automatic',
									'red',
								/* other */ 'neutral'
								],
						},
						
`


- The map componet can display a featureCollection or a point
- The layout is responsive with one breakpoint at 600px
- The data fetch is done from the services file api.js
- In map.js: 
    * useRef to store data var to compare with previous render to calculate if render again or not
    * useRef to store map var to keep the map and not creating a new one every render
    * and useRef to store resize var to avoid unnecessary rerenders
- If the data cannot be fetch a toaster message will appear, and dissappear when click or after 5 seconds