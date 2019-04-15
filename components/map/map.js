
const Map = () => (
  <div>
    <img className="mapImage" src="/static/plan.png" alt="map of floorplan" />
    <style jsx>
      {`
        .mapImage {
          display: block;
          float: left;
          width: 100%;
          height:100%;
          position: relative;
          top: 0;
          left: 0;          
          z-index: -1;
        }
      `}
    </style>
  </div>
);

export default Map;
