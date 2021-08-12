import * as React from "react";
import "./mystyles.scss";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date(),
    });
    //console.log(this.state.date.toLocaleTimeString());
  }
  render() {
    return (
      <div className="hero has-background-white is-fullheight">
        <div className="hero-body has-text-centered">
          <div className="is-size-1 ">{this.state.date.toLocaleTimeString()}</div>
        </div>
      </div>
    );
  }
}

const RenderClock = () => {
  return <Clock />;
};
 
export default RenderClock;
