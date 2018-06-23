//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import father from "./father.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    father,
    clickedFather: [],
    score: 0
  };

//when you click on a card ... the father is taken out of the array
  imageClick = event => {
    const currentFather = event.target.alt;
    const FatherAlreadyClicked =
      this.state.clickedFather.indexOf(currentFather) > -1;

//if you click on a father that has already been selected, the game is reset and cards reordered
    if (FatherAlreadyClicked) {
      this.setState({
        father: this.state.father.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedFather: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available father, your score is increased and cards reordered
    } else {
      this.setState(
        {
          father: this.state.father.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedFather: this.state.clickedFather.concat(
            currentFather
          ),
          score: this.state.score + 1
        },
//if you get all 12 fathers correct you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              father: this.state.father.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedFather: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.father.map(father => (
            <FriendCard
              imageClick={this.imageClick}
              id={father.id}
              key={father.id}
              image={father.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;