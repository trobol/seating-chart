import SeatingMap from '../components/Map/Map';

const Map = () => (
  <>
    <SeatingMap link="/api/seat/reservations" />
    <style>
      {`
    body {
      overflow:hidden !important;
      }
    `}
    </style>
  </>
);

export default Map;
