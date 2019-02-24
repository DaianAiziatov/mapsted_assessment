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

        /*const canvas = this.refs.canvas
        const ctx = canvas.getContext('2d')
        var maxHeight = canvas.width
        var height = 10
        var space = 1
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = "9px serif"*/
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

       /*for (var i = 0; i < arr.length; i++) {
            ctx.fillStyle = '#61C5FF'

            if (isNumeric(arr[i])) {

                ctx.fillRect(0, i * (height+space), parseInt(arr[i]) * 5, height);
                ctx.fillStyle = '#240be46'

                ctx.fillText(parseInt(arr[i]), parseInt(arr[i]) * 5, i * (height+space) + height);
            } else {
                ctx.fillText(arr[i], 0, i * (height+space) + height)
            }

        }*/
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