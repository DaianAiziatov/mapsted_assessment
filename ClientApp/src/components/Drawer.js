import React, { Component } from 'react'

class Drawer extends Component {
    static displayName = Drawer.name

    constructor (props) {
        super(props)
        this.state = {
            data: [],
            drawedComponent: []
        }
        this.drawArray = this.drawArray.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data !== this.state.data) {
            this.setState(() => {
                this.animation(nextProps.data)
                return ({
                    data: nextProps.data
                })
            })
        }
    }

    drawArray(array) {

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        if (array == null){
            return
        }
        
        this.setState(() => {
            let newDrawedComponent = array.map(element => {
                let style = {
                    textAlign: 'right',
                    background: 'blue',
                    color: 'white',
                    width: isNumeric(element) ? element * 8 + "px" : 10,
                    height: 20
                }
                return (
                     <div>
                        <div style={style}>{element}</div>
                     </div>
                )
            })
            return ({
                drawedComponent: newDrawedComponent
            })
        })
    }

    animation(array) {
        var interval = 500
        array.forEach((item, index) => {
            setTimeout(() => this.drawArray(item), index * interval);
        });
    }

    render() {
        return (
            <div>
                {this.state.drawedComponent}
            </div>
        )
    }
}

export default Drawer