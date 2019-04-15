

const Map = ({ children }) => (
  <div>
    <img className="mapImage" src="/static/plan.png" alt="map of floorplan" />
    {children}
    <style jsx>
      {`
        .mapImage {
          display: block;
          float: up;
          width: 100%;
          height:100%;
          position: absolute;
          top: 10%;
          left: 198px;          
        }
      `}
    </style>
  </div>
);

export default Map;
