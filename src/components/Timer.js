import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.countDownId = null;
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
    };
  }

  componentDidMount() {
    this.countDownId = setInterval(this.timerInit, 1000);
  }

  componentWillUnmount() {
    if (this.countDownId) {
      clearInterval(this.countDownId);
    }
  }

  timerInit = () => {
    const startDate = parseInt(this.props.startDate);

    const now = new Date().getTime();
    if (!startDate) {
      this.setState({ expired: true });
      return;
    }

    const countDownStartDate = new Date(startDate).getTime();
    const distance = countDownStartDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // For countdown is finished
    if (distance < 0) {
      clearInterval(this.countDownId);
      this.setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      });
      return;
    }
    this.setState({ days, hours, minutes, seconds, expired: false });
  };

  render() {
    const { days, hours, minutes, seconds, expired } = this.state;

    return (
      <>
        <form>
          <button
            onClick={this.props.unstake}
            type="submit"
            className="w-100 b tn btn-lg btn-success rounded-pill"
          >
            Unstake
          </button>
        </form>
        <br />
        <table class="table table-borderless">
          <tbody>
            <tr>
              <td class="text-center">Days</td>
              <td class="text-center">Hours</td>
              <td class="text-center">Minutes</td>
              <td class="text-center">Seconds</td>
            </tr>

            <tr>
              <td class="text-center display-6 fw-bold">{days}</td>
              <td class="text-center display-6 fw-bold">{hours}</td>
              <td class="text-center display-6 fw-bold">{minutes}</td>
              <td class="text-center display-6 fw-bold">{seconds}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
export default Timer;
