import * as React from "react";
import * as io from "socket.io-client";
import {GameBoard, UserCanvas} from './canvas';
import {Landing} from './landing';
import PageTransition from 'react-router-page-transition';
import "./../assets/scss/app.scss";

const logo = require("./../assets/img/logo.png");

namespace App {
   export 
   interface IState {
      display: 'landing' | 'game';
   }
   export 
   interface IProps {
   }
}

export 
default class App extends React.Component<App.IProps, App.IState> {

   socket: SocketIO.Socket;

   constructor(props: App.IProps) {
      super(props);

      this.state = {display: 'landing'};

      this.socket = io('/game/web');
      this.transitionToGame = this.transitionToGame.bind(this);
   }

   transitionToGame() {
      this.setState({
         display: 'game'
      })
   }

   render() {
      let page: any;
   
      if (this.state.display == 'landing')
         page = (<Landing transition_func={this.transitionToGame} socket={this.socket} />);
      else
         page = (<GameBoard socket={this.socket} />);

      return (
         <div>
            <img src={logo} className={'sd-logo'}/>
            <PageTransition>
               {page}
            </PageTransition>
         </div>
      );
   }
}

