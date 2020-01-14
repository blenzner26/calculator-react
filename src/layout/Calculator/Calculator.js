import React from 'react';
import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';
import Switch from '@material-ui/core/Switch';
import Brightness3SharpIcon from '@material-ui/icons/Brightness3Sharp';

class calculator extends React.Component {
    state = {
        darkMode: false,
        equation: '',
        result: 0
    }

    handleChange(){
        if (this.state.darkMode === false) {
            this.setState({darkMode: true});
        }
        else if(this.state.darkMode === true) {
            this.setState({darkMode: false});
        }
    }

    getModeClassNames(){
        let cssClass = "lightTheme";
        if (this.state.darkMode === false) {
            cssClass = "lightTheme";
        }
        else if(this.state.darkMode === true) {
            cssClass = "darkTheme";
        }
        return cssClass;
    }

    onButtonPress = event => {
        let equation = this.state.equation;
        const pressedButton = event.target.innerHTML;

        if (pressedButton === 'C'){
            return this.clear();
        }
        else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.'){
            equation += pressedButton;
        }
        else if (['+', '-', '*', '/', '%'].indexOf(pressedButton) !== -1) {
            equation += ' ' + pressedButton + ' ';
        }
        else if (pressedButton === '=') {
          try {
            const evalResult = eval(equation);
            const result = Number.isInteger(evalResult)? evalResult : evalResult.toFixed(2);
            this.setState({result});
          } 
          catch (error) {
            alert('Invalid Mathematical Equation');
          }
        }
        else {
          equation = equation.trim();
          equation = equation.substr(0, equation.length - 1);
        }
                    
        this.setState({equation: equation});
    }

    clear() {
        this.setState({equation: '', result: 0});
    }

    render() {
        return (
            <main className={this.getModeClassNames() + "_Calculator" + " calculator"}>
                <Brightness3SharpIcon className={this.getModeClassNames()+ "_Icon"} />
                <Switch className={this.getModeClassNames() + "_Switch"} color="primary" onChange={() => this.handleChange()} inputProps={{ 'aria-label': 'primary checkbox' }} />
                <Screen className={this.getModeClassNames() + "_Screen"} equation={this.state.equation} result={this.state.result} />
                <Keypad className={this.getModeClassNames() + "_Keypad"} onButtonPress={this.onButtonPress} />
            </main>
        );
    }
}

export default calculator;