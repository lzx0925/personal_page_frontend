import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Symbol from "./Symbol";
import Card from "./Card";
import Summary from "./Summary";
const { backend_url } = require("../../../config");
export default function FourNums() {
  const [expression, setExpression] = useState(["", "", "", "", "", "", ""]);
  const [paranthesis, setParanthesis] = useState(null);
  const [summary, setSummary] = useState(null);
  const [chance, setChance] = useState(5);
  const [newGame, setNewGame] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dropCard = (e, index) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("card");
    if (data.includes("card")) {
      const card = document.getElementById(data);
      card.style.transform = "";
      e.target.appendChild(card);
      card.addEventListener("click", handleRemoveCard);
      card.style.animationName = "";
      let newExpression = expression;
      newExpression[index] = card.textContent;
      setExpression(newExpression);
    }
  };

  const dropSymbol = (e, index) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("symbol");
    if (e.target.id) {
      //no symbol in the box
      if (
        data.includes("+") ||
        data.includes("-") ||
        data.includes("*") ||
        data.includes("/")
      ) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "symbol");
        newDiv.setAttribute("value", data);
        newDiv.setAttribute("name", data);
        newDiv.addEventListener("click", handleRemoveSymbol);
        newDiv.textContent = data;
        e.target.appendChild(newDiv);
        let newExpression = expression;
        newExpression[index] = data;
        setExpression(newExpression);
      }
    } else if (data === "()") {
      //already has symbol in box and now is paran
      checkParanthesis(e.target.parentNode.id);
    }
  };
  useEffect(() => {
    if (expression) console.log(expression);
    if (paranthesis) console.log(paranthesis);
    if (summary) console.log(summary);
  }, [expression, paranthesis, summary]);

  function checkParanthesis(box) {
    const num = Number(box[box.length - 1]);
    if (!paranthesis || Object.keys(paranthesis).length === 0) {
      addParanthesis(num, num);
      setParanthesis({ [num]: num });
    } else if (Object.keys(paranthesis).length === 1) {
      if (paranthesis[1]) {
        if (num === 3) {
          addParanthesis(3, 3, 7);
        } else if (num === 2) {
          addParanthesis(4, 2, 10);
        }
      } else if (paranthesis[2]) {
        if (num === 1) {
          addParanthesis(4, 1, 10);
        } else if (num === 3) {
          addParanthesis(5, 3, 11);
        }
      } else if (paranthesis[3]) {
        if (num === 1) {
          addParanthesis(1, 1, 3);
        } else if (num === 2) {
          addParanthesis(5, 2, 11);
        }
      }
    }
  }

  function addParanthesis(n, box) {
    setParanthesis((prevState) => ({ ...prevState, [box]: n }));
    const left = document.getElementById("l" + n);
    const right = document.getElementById("r" + n);
    left.textContent = "(";
    right.textContent = ")";
    left.style.display = "flex";
    right.style.display = "flex";
  }

  const handleRemoveParanthesis = (n) => {
    Object.entries(paranthesis).forEach(([key, value]) => {
      if (value === n) {
        const paran = { ...paranthesis };
        delete paran[key];
        setParanthesis(paran);
        const left = document.getElementById("l" + n);
        const right = document.getElementById("r" + n);
        left.style.display = "none";
        right.style.display = "none";
      }
    });
  };

  const handleRemoveSymbol = (e) => {
    const index = Number(e.target.parentNode.id.slice(-1)) * 2 - 1;
    setExpression(
      expression
        .slice(0, index)
        .concat([""])
        .concat(expression.slice(index + 1))
    );
    e.target.remove();
  };

  const handleRemoveCard = (e) => {
    //remove from Expression
    const index = (Number(e.target.parentNode.id.slice(-1)) - 1) * 2;
    setExpression(
      expression
        .slice(0, index)
        .concat([""])
        .concat(expression.slice(index + 1))
    );
    //remove from Place
    e.target.remove();
    document.getElementsByClassName("poker-container")[0].appendChild(e.target);
    const id = e.target.id;
    if (id === "card1") {
      e.target.style.transform = "translateX(-280px)";
    } else if (id === "card2") {
      e.target.style.transform = "translateX(-90px)";
    } else if (id === "card3") {
      e.target.style.transform = "translateX(90px)";
    } else if (id === "card4") {
      e.target.style.transform = "translateX(280px)";
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  function submitAns() {
    console.log("submit");
    if (user) {
      axios
        .post(backend_url + "/checkFourNums", {
          email: user.email,
          expression: expression,
          paranthesis: paranthesis ? Object.values(paranthesis) : null,
          chance: chance,
        })
        .then((response) => {
          if (response.data.result === 24) {
            console.log("Success");
            setSummary({
              status: response.data.result,
              chance: chance,
              gameData: response.data.gameData,
            });
          } else {
            if (chance === 1) {
              console.log("no chance!");
              setSummary({
                status: response.data.result,
                chance: chance,
                gameData: response.data.gameData,
              });
            } else {
              console.log("more chance!", chance);
              setSummary({
                status: response.data.result,
                chance: chance,
                gameData: null,
              });
            }
            setChance(chance - 1);
            console.log("after -1", chance);
          }
        });
    }
    console.log(6666, summary);
  }

  function helpHandler() {
    setSummary({
      status: "help",
      chance: 0,
      gameData: null,
    });
    document.getElementById("fournums").style.filter = "blur(5px)";
  }

  return (
    <div>
      <div className="fournums" id="fournums">
        <div className="header">
          <div className="null"></div>
          <div className="title">FourNums</div>
          <i className="fa fa-question-circle-o" onClick={helpHandler}></i>
        </div>
        <Card />
        <div className="expression-container">
          <div
            className="paran"
            id="l4"
            key="l4"
            onClick={() => {
              handleRemoveParanthesis(4);
            }}
          ></div>
          <div
            className="paran"
            id="l1"
            key="l1"
            onClick={() => {
              handleRemoveParanthesis(1);
            }}
          ></div>
          <div
            className="num-box"
            id="num1"
            key="num1"
            onDrop={(e) => dropCard(e, 0)}
            onDragOver={(e) => allowDrop(e)}
          ></div>
          <div
            className="symbol-box"
            id="symbol1"
            key="symbol1"
            onDrop={(e) => dropSymbol(e, 1)}
            onDragOver={(e) => allowDrop(e)}
          ></div>
          <div
            className="paran"
            id="l5"
            key="l5"
            onClick={() => {
              handleRemoveParanthesis(5);
            }}
          ></div>
          <div
            className="paran"
            id="l2"
            key="l2"
            onClick={() => {
              handleRemoveParanthesis(2);
            }}
          ></div>
          <div
            className="num-box"
            id="num2"
            key="num2"
            onDrop={(e) => dropCard(e, 2)}
            onDragOver={(e) => allowDrop(e)}
          ></div>
          <div
            className="paran"
            id="r1"
            key="r1"
            onClick={() => {
              handleRemoveParanthesis(1);
            }}
          ></div>
          <div
            className="symbol-box"
            id="symbol2"
            key="symbol2"
            onDrop={(e) => dropSymbol(e, 3)}
            onDragOver={(e) => allowDrop(e)}
          ></div>
          <div
            className="paran"
            id="l3"
            key="l3"
            onClick={() => {
              handleRemoveParanthesis(3);
            }}
          ></div>
          <div
            className="num-box"
            id="num3"
            key="num3"
            onDrop={(e) => dropCard(e, 4)}
            onDragOver={(e) => allowDrop(e)}
          ></div>
          <div
            className="paran"
            id="r2"
            key="r2"
            onClick={() => {
              handleRemoveParanthesis(2);
            }}
          ></div>
          <div
            className="paran"
            id="r4"
            onClick={() => {
              handleRemoveParanthesis(4);
            }}
          ></div>
          <div
            className="symbol-box"
            id="symbol3"
            onDrop={(e) => dropSymbol(e, 5)}
            onDragOver={(e) => allowDrop(e)}
          ></div>
          <div
            className="num-box"
            id="num4"
            onDrop={(e) => dropCard(e, 6)}
            onDragOver={(e) => allowDrop(e)}
          ></div>
          <div
            className="paran"
            id="r3"
            onClick={() => {
              handleRemoveParanthesis(3);
            }}
          ></div>
          <div
            className="paran"
            id="r5"
            onClick={() => {
              handleRemoveParanthesis(5);
            }}
          ></div>
        </div>
        <Symbol />
        <button className="get-ans" onClick={submitAns}>
          I get 24!
        </button>
      </div>
      {summary && (
        <Summary
          closeWarning={() => {
            setSummary(null);
            document.getElementById("fournums").style.filter = "blur(0px)";
          }}
          resetHandler={() => {
            window.location.reload();
          }}
          status={summary.status}
          chance={summary.chance}
          gameData={summary.gameData}
        />
      )}
    </div>
  );
}

//{symbol["+"] != 1 ? addSymbol("+", symbol["+"]) : null}
