

class SeatCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: props.x, y: props.y };
  }

  render() {
    return (
      <div>
        <img className="circle" src="/static/users/guest.jpg" alt="user profile" />
        <style jsx>
          {`
                    .circle {
                        width: 20px;
                        height: 20px;
                        display: block;
                        position: absolute;
                        left: ${this.state.x}%;
                        top: ${this.state.y}%;
                        border-radius: 50%;
                        border-style: solid;
                    }
                    `}
        </style>
      </div>
    );
  }
}

export default SeatCircle;
