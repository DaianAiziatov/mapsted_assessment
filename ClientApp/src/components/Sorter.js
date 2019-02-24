import React, { Component } from 'react'
import Drawer from "./Drawer"

class Counter extends Component {
    static displayName = Counter.name

    constructor (props) {
        super(props)
        this.state = {
            userInput: "",
            sortType: "quick",
            valuesType: "int",
            isLoading: false,
            response: []
        }
        this.inputValidation = this.inputValidation.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitValues = this.submitValues.bind(this)
    }

    inputValidation() {
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        let arrayOfStrings = this.state.userInput.split(",")

        if (arrayOfStrings.lenth > 500 || arrayOfStrings.lent < 0) {
            alert("Input size must be no more than 500 values and must be at least 1");
            return false;
        }
        for (let i = 0; i < arrayOfStrings.length; i++) {
            arrayOfStrings[i] = arrayOfStrings[i].trim
            if (arrayOfStrings[i] >  Number.MAX_SAFE_INTEGER) {
                alert("Numeric values must be integer size");
                return false;
            }
            if (arrayOfStrings[i].lenth > 10 && !isNumeric(arrayOfStrings[i])) {
                alert("String values must be up to 10 characters long");
                return false;
            }
        }
        return true
    }   

    submitValues() {
        if (!this.inputValidation()) return
        console.log(this.state)
        fetch('../api/sort', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userInput": this.state.userInput,
                "sortType": this.state.sortType,
                "valuesType": this.state.valuesType
            })
        })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              this.setState({
                response: data
              })
              console.log(this.state)
            })
            .catch(error => alert(`parsing failed: ${error}`))
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render () {
        return (
            <div>
                <h1>Sort</h1>
                <label>
                    Input <br/>
                    <input
                        type="text"
                        name="userInput"
                        placeholder="Input separated by comas"
                        value={this.state.userData}
                        onChange={this.handleChange}
                    />
                </label>
                <br/>

                <label>
                    Sort Type <br/>
                    <select
                        name="sortType"
                        value={this.state.sortType}
                        onChange={this.handleChange}
                    >
                        <option value="quick">Quick</option>
                        <option value="bubble">Bubble</option>
                    </select>
                </label>

                <label>
                    Value Type<br/>
                    <select
                        name="valuesType"
                        value={this.state.valuesType}
                        onChange={this.handleChange}
                    >
                        <option value="int">int</option>
                        <option value="double">double</option>
                        <option value="string">string</option>
                    </select>
                </label>
                <br/>

                <button className="btn btn-primary" onClick={this.submitValues}>Submit</button>
                <div>
                    <Drawer data={this.state.response} />
                </div>
            </div>
    )
  }
}

export default Counter
