import React from "react";
import "./App.css";
import missAudio from "./miss.mp3";
import hitAudio from "./hit.mp3";
import background from "./background.mp3";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisplay: "visibleButton",
      computerBoard: [
        0,
        0,
        "S",
        "S",
        "S",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "S",
        0,
        0,
        0,
        "S",
        "S",
        "S",
        "S",
        0,
        0,
        "S",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "S",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "S",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "S",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "S",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "S",
        0,
      ],
      computerGridDisplay: "invisible",
      draggedShipLength: "",
      gameIsWon: "invisible",
      playerBoard: Array(100).fill(0),
      playerGridDisplay: "invisible",
      vertical: "vertical",
      shipPlacer: "invisible",
      ships: [
        {},
        {},
        {
          classes: "shipCell",
          coordinates: [],
          direction: "twoShip",
          draggable: true,
          endCell: "shipCell bottomCell",
        },
        {
          classes: "shipCell",
          coordinates: [],
          direction: "threeShip",
          draggable: true,
          endCell: "shipCell bottomCell",
        },
        {
          classes: "shipCell",
          coordinates: [],
          direction: "fourShip",
          draggable: true,
          endCell: "shipCell bottomCell",
        },
        {
          classes: "shipCell",
          coordinates: [],
          direction: "fiveShip",
          draggable: true,
          endCell: "shipCell bottomCell",
        },
      ],
    };
    this.buttonClicked = this.buttonClicked.bind(this);
    this.computerAttack = this.computerAttack.bind(this);
    this.flipShips = this.flipShips.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.hoverGrid = this.hoverGrid.bind(this);
    this.mouseLeftGrid = this.mouseLeftGrid.bind(this);
    this.playerAttack = this.playerAttack.bind(this);
    this.renderPlayerGrid = this.renderPlayerGrid.bind(this);
    this.getDraggedShip = this.getDraggedShip.bind(this);
    this.dropShip = this.dropShip.bind(this);
  }

  buttonClicked(event) {
    if (event.target.textContent === "READY") {
      if (
        this.state.ships[2].coordinates.length !== 0 &&
        this.state.ships[3].coordinates.length !== 0 &&
        this.state.ships[4].coordinates.length !== 0 &&
        this.state.ships[5].coordinates.length !== 0
      ) {
        this.setState({ computerGridDisplay: "visible" });
        this.setState({ shipPlacer: "invisible" });
        event.target.className = "invisible";
        let playerBoard = [...this.state.playerBoard];
        this.state.ships[5].coordinates.forEach(
          (cell) => (playerBoard[cell] = "S")
        );
        this.state.ships[4].coordinates.forEach(
          (cell) => (playerBoard[cell] = "S")
        );
        this.state.ships[3].coordinates.forEach(
          (cell) => (playerBoard[cell] = "S")
        );
        this.state.ships[2].coordinates.forEach(
          (cell) => (playerBoard[cell] = "S")
        );
        this.setState({ playerBoard: playerBoard });
      }
    }
    if (event.target.textContent === "PLAY") {
      const music = document.getElementsByClassName("audio-element")[2];
      music.play();
      music.loop = true;
      this.setState({ playerGridDisplay: "visible" });
      this.setState({ shipPlacer: "visibleShipHolder" });
      event.target.textContent = "READY";
    }
  }

  computerAttack() {
    let playerBoard = [...this.state.playerBoard];
    let availableMoves = [];
    for (let i = 0; i < playerBoard.length; i++) {
      if (playerBoard[i] !== "M" && playerBoard[i] !== "H") {
        availableMoves.push(i);
      }
    }
    let index = Math.floor(Math.random() * availableMoves.length);
    let move = availableMoves[index];
    if (playerBoard[move] === 0) {
      playerBoard[move] = "M";
    } else {
      playerBoard[move] = "H";
      if (playerBoard.includes("S") === false) {
        this.setState({ gameIsWon: "Computer" });
        document.body.style.overflow = "scroll";
      }
    }
    this.setState({ playerBoard: playerBoard });
  }

  dropShip(event) {
    const cells = Array.from(document.querySelectorAll(".hovered"));
    cells.forEach((cell) => cell.classList.add("ship"));
    cells.forEach((cell) => cell.classList.remove("hovered"));
    let ships = [...this.state.ships];
    let currentShip = { ...ships[cells.length] };
    currentShip.draggable = false;
    currentShip.classes = "placed";
    currentShip.endCell = "placed";
    ships[cells.length] = currentShip;
    this.setState({ ships: ships });
  }

  flipShips(event) {
    let ships = [...this.state.ships];
    if (this.state.vertical === "vertical") {
      for (let i = 2; i <= 5; i++) {
        if (ships[i].classes !== "placed") {
          ships[i].classes = "shipCellHorizontal";
          ships[i].endCell = "shipCellHorizontal endcell";
        }
      }
      ships[2].direction = "twoShipHorizontal";
      ships[3].direction = "threeShipHorizontal";
      ships[4].direction = "fourShipHorizontal";
      ships[5].direction = "fiveShipHorizontal";
      this.setState({ ships: ships });
      this.setState({ vertical: "horizontal" });
      this.setState({ shipPlacer: "horizontalShipHolder" });
    } else {
      for (let j = 2; j <= 5; j++) {
        if (ships[j].classes !== "placed") {
          ships[j].classes = "shipCell";
          ships[j].endCell = "shipCell bottomCell";
        }
      }
      ships[2].direction = "twoShip";
      ships[3].direction = "threeShip";
      ships[4].direction = "fourShip";
      ships[5].direction = "fiveShip";
      this.setState({ ships: ships });
      this.setState({ vertical: "vertical" });
      this.setState({ shipPlacer: "visibleShipHolder" });
    }
  }

  getCoordinates(event) {
    event.preventDefault();
    let shipLength = this.state.draggedShipLength;
    let position = [];
    let direction = this.state.vertical;
    let cellList = Array.from(event.target.parentNode.children);
    let current = cellList.indexOf(event.target);
    if (direction === "vertical") {
      for (let i = 0; i < shipLength; i++) {
        position.push(current + i * 10);
      }
      const cells = Array.from(document.querySelectorAll(".hovered"));
      cells.forEach((cell) => cell.classList.remove("hovered"));
      if (position[shipLength - 1] < 100) {
        for (let j = 0; j < shipLength; j++) {
          if (cellList[position[j]].classList.contains("ship")) {
            return;
          }
        }
        let ships = [...this.state.ships];
        let currentShip = { ...ships[position.length] };
        currentShip.coordinates = position;
        ships[position.length] = currentShip;
        this.setState({ ships: ships });
        position.forEach((cell) => cellList[cell].classList.add("hovered"));
      }
    } else {
      for (let k = 0; k < shipLength; k++) {
        position.push(current + k);
      }
      const cells = Array.from(document.querySelectorAll(".hovered"));
      cells.forEach((cell) => cell.classList.remove("hovered"));
      if (
        position[shipLength - 1] < 100 &&
        position[0] % 10 < position[shipLength - 1] % 10
      ) {
        for (let w = 0; w < shipLength; w++) {
          if (cellList[position[w]].classList.contains("ship")) {
            return;
          }
        }
        let ships = [...this.state.ships];
        let currentShip = { ...ships[position.length] };
        currentShip.coordinates = position;
        ships[position.length] = currentShip;
        this.setState({ ships: ships });
        position.forEach((cell) => cellList[cell].classList.add("hovered"));
      }
    }
  }

  getDraggedShip(event) {
    this.setState({ draggedShipLength: event.target.childElementCount });
  }

  hoverGrid(event) {
    let cellList = Array.from(event.target.parentNode.children);
    let current = cellList.indexOf(event.target);
    const cells = Array.from(document.querySelectorAll(".hovered"));
    cells.forEach((cell) => cell.classList.remove("hovered"));
    if (
      this.state.computerBoard[current] !== "M" &&
      this.state.computerBoard[current] !== "H"
    ) {
      cellList[current].classList.add("hovered");
    }
  }

  mouseLeftGrid() {
    const cells = Array.from(document.querySelectorAll(".hovered"));
    cells.forEach((cell) => cell.classList.remove("hovered"));
  }

  playerAttack(event) {
    let cellList = Array.from(event.target.parentNode.children);
    let current = cellList.indexOf(event.target);
    let valid = false;
    const audioMiss = document.getElementsByClassName("audio-element")[0];
    const audioHit = document.getElementsByClassName("audio-element")[1];
    const cells = Array.from(document.querySelectorAll(".hovered"));
    cells.forEach((cell) => cell.classList.remove("hovered"));
    let computerBoard = [...this.state.computerBoard];
    if (computerBoard[current] === 0) {
      valid = true;
      computerBoard[current] = "M";
      this.setState({ computerBoard: computerBoard });
      event.target.classList.remove("cell");
      event.target.classList.add("miss");
      audioMiss.pause();
      audioMiss.currentTime = 0;
      audioMiss.play();
    }
    if (computerBoard[current] === "S") {
      valid = true;
      computerBoard[current] = "H";
      this.setState({ computerBoard: computerBoard });
      event.target.classList.remove("cell");
      event.target.classList.add("hit");
      audioHit.pause();
      audioHit.currentTime = 0;
      audioHit.play();
      if (computerBoard.includes("S") === false) {
        this.setState({ gameIsWon: "Player" });
        document.body.style.overflow = "scroll";
      }
    }
    if (valid) {
      this.computerAttack();
    }
  }

  renderPlayerGrid(cell) {
    let playerBoard = [...this.state.playerBoard];
    let classname = "cell";
    if (playerBoard[cell] === "M") {
      classname = "miss";
    }
    if (playerBoard[cell] === "H") {
      classname = "hit";
    }
    if (cell % 10 === 9) {
      classname += " endcell";
    }
    if (cell > 89) {
      classname += " bottomCell";
    }
    if (playerBoard[cell] === "S") {
      classname += " ship";
    }

    return classname;
  }

  render() {
    return (
      <div id="gameContainer">
        <audio className="audio-element">
          <source src={missAudio}></source>
        </audio>
        <audio className="audio-element">
          <source src={hitAudio}></source>
        </audio>
        <audio className="audio-element">
          <source src={background}></source>
        </audio>
        <Title />
        <GameOver displayable={this.state.gameIsWon} />
        <Button
          visibility={this.state.buttonDisplay}
          onClick={this.buttonClicked}
        />
        <div id="game">
          <div id="shipHolder" className={this.state.shipPlacer}>
            <div className={this.state.vertical}>
              <div
                id={this.state.ships[5].direction}
                draggable={this.state.ships[5].draggable}
                onDragStart={this.getDraggedShip}
              >
                <div className={this.state.ships[5].classes}></div>
                <div className={this.state.ships[5].classes}></div>
                <div className={this.state.ships[5].classes}></div>
                <div className={this.state.ships[5].classes}></div>
                <div className={this.state.ships[5].endCell}></div>
              </div>
            </div>

            <div className={this.state.vertical}>
              <div
                id={this.state.ships[4].direction}
                draggable={this.state.ships[4].draggable}
                onDragStart={this.getDraggedShip}
              >
                <div className={this.state.ships[4].classes}></div>
                <div className={this.state.ships[4].classes}></div>
                <div className={this.state.ships[4].classes}></div>
                <div className={this.state.ships[4].endCell}></div>
              </div>
            </div>
            <div className={this.state.vertical}>
              <div
                id={this.state.ships[3].direction}
                draggable={this.state.ships[3].draggable}
                onDragStart={this.getDraggedShip}
              >
                <div className={this.state.ships[3].classes}></div>
                <div className={this.state.ships[3].classes}></div>
                <div className={this.state.ships[3].endCell}></div>
              </div>
            </div>
            <div className={this.state.vertical}>
              <div
                id={this.state.ships[2].direction}
                draggable={this.state.ships[2].draggable}
                onDragStart={this.getDraggedShip}
              >
                <div className={this.state.ships[2].classes}></div>
                <div className={this.state.ships[2].endCell}></div>
              </div>
            </div>
            <button id="flipShips" onClick={this.flipShips}>
              Flip Ships
            </button>
          </div>
          <div
            id="playerGrid"
            onDragOver={this.getCoordinates}
            onDragLeave={this.mouseLeftGrid}
            onDrop={this.dropShip}
            className={this.state.playerGridDisplay}
            ref="playerGrid"
          >
            <div className={this.renderPlayerGrid(0)}></div>
            <div className={this.renderPlayerGrid(1)}></div>
            <div className={this.renderPlayerGrid(2)}></div>
            <div className={this.renderPlayerGrid(3)}></div>
            <div className={this.renderPlayerGrid(4)}></div>
            <div className={this.renderPlayerGrid(5)}></div>
            <div className={this.renderPlayerGrid(6)}></div>
            <div className={this.renderPlayerGrid(7)}></div>
            <div className={this.renderPlayerGrid(8)}></div>
            <div className={this.renderPlayerGrid(9)}></div>
            <div className={this.renderPlayerGrid(10)}></div>
            <div className={this.renderPlayerGrid(11)}></div>
            <div className={this.renderPlayerGrid(12)}></div>
            <div className={this.renderPlayerGrid(13)}></div>
            <div className={this.renderPlayerGrid(14)}></div>
            <div className={this.renderPlayerGrid(15)}></div>
            <div className={this.renderPlayerGrid(16)}></div>
            <div className={this.renderPlayerGrid(17)}></div>
            <div className={this.renderPlayerGrid(18)}></div>
            <div className={this.renderPlayerGrid(19)}></div>
            <div className={this.renderPlayerGrid(20)}></div>
            <div className={this.renderPlayerGrid(21)}></div>
            <div className={this.renderPlayerGrid(22)}></div>
            <div className={this.renderPlayerGrid(23)}></div>
            <div className={this.renderPlayerGrid(24)}></div>
            <div className={this.renderPlayerGrid(25)}></div>
            <div className={this.renderPlayerGrid(26)}></div>
            <div className={this.renderPlayerGrid(27)}></div>
            <div className={this.renderPlayerGrid(28)}></div>
            <div className={this.renderPlayerGrid(29)}></div>
            <div className={this.renderPlayerGrid(30)}></div>
            <div className={this.renderPlayerGrid(31)}></div>
            <div className={this.renderPlayerGrid(32)}></div>
            <div className={this.renderPlayerGrid(33)}></div>
            <div className={this.renderPlayerGrid(34)}></div>
            <div className={this.renderPlayerGrid(35)}></div>
            <div className={this.renderPlayerGrid(36)}></div>
            <div className={this.renderPlayerGrid(37)}></div>
            <div className={this.renderPlayerGrid(38)}></div>
            <div className={this.renderPlayerGrid(39)}></div>
            <div className={this.renderPlayerGrid(40)}></div>
            <div className={this.renderPlayerGrid(41)}></div>
            <div className={this.renderPlayerGrid(42)}></div>
            <div className={this.renderPlayerGrid(43)}></div>
            <div className={this.renderPlayerGrid(44)}></div>
            <div className={this.renderPlayerGrid(45)}></div>
            <div className={this.renderPlayerGrid(46)}></div>
            <div className={this.renderPlayerGrid(47)}></div>
            <div className={this.renderPlayerGrid(48)}></div>
            <div className={this.renderPlayerGrid(49)}></div>
            <div className={this.renderPlayerGrid(50)}></div>
            <div className={this.renderPlayerGrid(51)}></div>
            <div className={this.renderPlayerGrid(52)}></div>
            <div className={this.renderPlayerGrid(53)}></div>
            <div className={this.renderPlayerGrid(54)}></div>
            <div className={this.renderPlayerGrid(55)}></div>
            <div className={this.renderPlayerGrid(56)}></div>
            <div className={this.renderPlayerGrid(57)}></div>
            <div className={this.renderPlayerGrid(58)}></div>
            <div className={this.renderPlayerGrid(59)}></div>
            <div className={this.renderPlayerGrid(60)}></div>
            <div className={this.renderPlayerGrid(61)}></div>
            <div className={this.renderPlayerGrid(62)}></div>
            <div className={this.renderPlayerGrid(63)}></div>
            <div className={this.renderPlayerGrid(64)}></div>
            <div className={this.renderPlayerGrid(65)}></div>
            <div className={this.renderPlayerGrid(66)}></div>
            <div className={this.renderPlayerGrid(67)}></div>
            <div className={this.renderPlayerGrid(68)}></div>
            <div className={this.renderPlayerGrid(69)}></div>
            <div className={this.renderPlayerGrid(70)}></div>
            <div className={this.renderPlayerGrid(71)}></div>
            <div className={this.renderPlayerGrid(72)}></div>
            <div className={this.renderPlayerGrid(73)}></div>
            <div className={this.renderPlayerGrid(74)}></div>
            <div className={this.renderPlayerGrid(75)}></div>
            <div className={this.renderPlayerGrid(76)}></div>
            <div className={this.renderPlayerGrid(77)}></div>
            <div className={this.renderPlayerGrid(78)}></div>
            <div className={this.renderPlayerGrid(79)}></div>
            <div className={this.renderPlayerGrid(80)}></div>
            <div className={this.renderPlayerGrid(81)}></div>
            <div className={this.renderPlayerGrid(82)}></div>
            <div className={this.renderPlayerGrid(83)}></div>
            <div className={this.renderPlayerGrid(84)}></div>
            <div className={this.renderPlayerGrid(85)}></div>
            <div className={this.renderPlayerGrid(86)}></div>
            <div className={this.renderPlayerGrid(87)}></div>
            <div className={this.renderPlayerGrid(88)}></div>
            <div className={this.renderPlayerGrid(89)}></div>
            <div className={this.renderPlayerGrid(90)}></div>
            <div className={this.renderPlayerGrid(91)}></div>
            <div className={this.renderPlayerGrid(92)}></div>
            <div className={this.renderPlayerGrid(93)}></div>
            <div className={this.renderPlayerGrid(94)}></div>
            <div className={this.renderPlayerGrid(95)}></div>
            <div className={this.renderPlayerGrid(96)}></div>
            <div className={this.renderPlayerGrid(97)}></div>
            <div className={this.renderPlayerGrid(98)}></div>
            <div className={this.renderPlayerGrid(99)}></div>
          </div>
          <div
            id="computerGrid"
            className={this.state.computerGridDisplay}
            onMouseOver={this.hoverGrid}
            onMouseLeave={this.mouseLeftGrid}
            onClick={this.playerAttack}
          >
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="endcell cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell endcell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell endcell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell endcell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell endcell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell endcell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell endcell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell endcell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell endcell"></div>
            <div className="cell bottomCell"></div>
            <div className="cell bottomCell"></div>
            <div className="cell bottomCell"></div>
            <div className="cell bottomCell"></div>
            <div className="cell bottomCell"></div>
            <div className="cell bottomCell"></div>
            <div className="cell bottomCell"></div>
            <div className="cell bottomCell"></div>
            <div className="cell bottomCell"></div>
            <div className="cell bottomCell endcell"></div>
          </div>
        </div>
      </div>
    );
  }
}

function Title() {
  return (
    <div>
      <div id="title">
        <h1>Battleships</h1>
      </div>
      <div id="subtitle">
        <h2>By Kevin Satti</h2>
      </div>
    </div>
  );
}

function Button(props) {
  return (
    <div id="buttonContainer">
      <button id="button" className={props.visibility} onClick={props.onClick}>
        PLAY
      </button>
    </div>
  );
}

function GameOver(props) {
  return (
    <div className={props.displayable}>
      <div className="text">{props.displayable} Wins!</div>
    </div>
  );
}

export default App;
