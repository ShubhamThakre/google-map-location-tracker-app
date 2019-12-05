import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap,Marker,Polyline} from 'react-google-maps'


 const dataUrl="short_json_api.json"
//const dataUrl= "58393297483727762_5th_9th_june.json"

class Map extends React.Component {
    
    //global elements / variable
    //velocity = 300
    initialDate = new Date()
    mypath=[]

    constructor(props){
        super(props);
        this.state={
            progress:[],
            path:[],
            velocity:100
        }
        this.calculateDistance = this.calculateDistance.bind(this);
        this.moveObject = this.moveObject.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({velocity: event.target.value},()=>{console.log(this.state);
        });
    }
   
    fetchAPI = () =>{    
        fetch(dataUrl,{
            method: 'get',
            headers: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
        .then(data => {
            let arr = [];
            data.map((ele) => {return arr.push({'lat': ele.loc.coordinates[0], 'lng': ele.loc.coordinates[1]})});
            this.calculateDistance(arr);
        })
        .catch(error => console.log( error))  
    }; 
    
    calculateDistance = (arr) =>{
        const finalArr=[];
        const newArr= [...arr];
        newArr.map((coordinates, i , array) => {
            
            if (i === 0) {
                return { ...coordinates, distance: 0 } // it begins here! 
            }

            const { lat: lat1, lng: lng1 } = coordinates
            const latLong1 = new window.google.maps.LatLng(lat1, lng1)
            const { lat: lat2, lng: lng2 } = array[0]
            const latLong2 = new window.google.maps.LatLng(lat2, lng2)

            // in meters:
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                latLong1,
                latLong2
            )

            return finalArr.push({ ...coordinates, distance });
        });
        
        // updating the path
        this.mypath = finalArr
    }

    getDistance = () => {
        const differentInTime = (new Date() - this.initialDate) / 1000 // pass to seconds
        return differentInTime * this.state.velocity // d = v*t -- thanks Newton!
    }
    
    //testing function
    consoleDistance = () => {
        console.log(this.getDistance())
    }

    moveObject = () => {
        const distance = this.getDistance()
        if (! distance) {
          return
        }

        let progress = this.mypath.filter(coordinates => {
            
            return coordinates.distance < distance
        })
        
        const nextLine = this.mypath.find(coordinates => coordinates.distance > distance)
        if (! nextLine) {
          this.setState({ progress })
          return // it's the end!
        }

        const lastLine = this.mypath[this.mypath.length - 1]

        const lastLineLatLng = new window.google.maps.LatLng(
        lastLine.lat,
        lastLine.lng
        )

        const nextLineLatLng = new window.google.maps.LatLng(
        nextLine.lat,
        nextLine.lng
        )

        const totalDistance = nextLine.distance - lastLine.distance
        const percentage = (distance - lastLine.distance) / totalDistance

        const position = window.google.maps.geometry.spherical.interpolate(
        lastLineLatLng,
        nextLineLatLng,
        percentage
        )
        progress = progress.concat(position)
        this.setState({ progress })
    }

    UNSAFE_componentWillMount = () =>{
        
    }
    componentDidMount = () =>{
        this.fetchAPI();
        // this.interval = window.setInterval(this.consoleDistance, 1000)
        this.interval = window.setInterval(this.moveObject, 1000)
        
    }
    componentWillUnmount = () => {
        window.clearInterval(this.interval)
      }
    
    render = () => {
        const icon = {
            url:
              "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: { x: 10, y: 10 },
            color: 'red'
        };
      
        return (
            <div>
                <form>
                    <label>
                    Select Speed of Vechical:
                    <select value={this.state.velocity} onChange={this.handleChange} style={{"margin": '0px 10px'}}>
                        <option key={0} value={100}>1x</option>
                        <option key={1} value={200}>2x</option>
                        <option key={2} value={300}>3x</option>
                        <option key={3} value={400}>4x</option>
                    </select>
                    </label>
                </form>
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={{ lat: 15.525326666666666, lng: 74.90859166666667 }}
                    >
                    {this.state.progress &&( 
                        <>  
                        
                            <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 " }} />
                            <Marker 
                                icon={icon}
                                position={this.state.progress[this.state.progress.length -1]} 
                            />
                        </>
                    )}
                </GoogleMap>
            </div>   
        
        )
        }
    }

const MapComponent = withScriptjs(withGoogleMap(Map))

export default MapComponent;