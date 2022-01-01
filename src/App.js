import Navbar from "./components/Navbar";
import StakeForm from "./components/StakeForm";
import UnstakeForm from "./components/UnstakeForm";
import Web3 from "web3";
import DApp from "./contract-abis/StakingDApp.json";

import React, { Component } from "react";

export default class App extends Component {
  // async shouldComponentUpdate(){
  //     await this.fetchWeb3()
  //     await this.fetchBlockchainData()
  // }
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      ethBalance: 0,
      rewardBalance: 0,
      dapp: undefined,
      loading: true,
      staked: false,
      valueStaked: 0,
      timer: 0,
    };
    this.setLoading = this.setLoading.bind(this);
  }

  async UNSAFE_componentWillMount() {
    await this.fetchWeb3();
    await this.fetchBlockchainData();
  }

  async fetchWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("No wallet found");
    } else {
      alert("No wallet found!");
    }
  }

  async fetchBlockchainData() {
    const web3 = window.web3;
    const accounts = await window.web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    let ethBal = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance: Number(this.fromWei(ethBal)).toFixed(2) });
    const netId = await web3.eth.net.getId();
    const networkData = DApp.networks[netId];
    if (networkData) {
      const abi = DApp.abi;
      const contractAddress = networkData.address;
      const contract = await new web3.eth.Contract(abi, contractAddress);
      let rwdBal = await contract.methods
        .getRewardBalance()
        .call({ from: this.state.account });
      let valueStaked = await contract.methods
        .valueStaked()
        .call({ from: this.state.account });

      this.setState({
        rwdBalance: Number(this.fromWei(rwdBal)).toFixed(2),
        dapp: contract,

        timer: await contract.methods
          .getTimer()
          .call({ from: this.state.account }),
        staked: await contract.methods
          .isStaked()
          .call({ from: this.state.account }),
        valueStaked: Number(this.fromWei(valueStaked)).toFixed(2),
        loading: false,
      });
    }
  }
  setLoading(status) {
    this.setState({ loading: status });
  }

  fromWei(number) {
    return window.web3.utils.fromWei(number.toString());
  }

  render() {
    let content = this.state.loading ? (
      <p>LOADING...</p>
    ) : this.state.staked ? (
      <UnstakeForm
        valueStaked={this.state.valueStaked}
        dapp={this.state.dapp}
        account={this.state.account}
        timer={this.state.timer}
        handleLoading={this.setLoading}
      />
    ) : (
      <StakeForm
        ethBalance={this.state.ethBalance}
        rwdBalance={this.state.rwdBalance}
        dapp={this.state.dapp}
        account={this.state.account}
      />
    );

    return (
      <>
        <Navbar account={this.state.account} />
        <div className="form-group align-center mt-5 pt-5">
          <img
            className="mx-auto d-block"
            src="assets/eth.png"
            alt=""
            width="200"
          />
          {content}
        </div>
      </>
    );
  }
}
