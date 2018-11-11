import * as React from "react";
import * as io from "socket.io-client";
import {GameBoard, UserCanvas} from './canvas';
import {Landing} from './landing';
import PageTransition from 'react-router-page-transition';
import "./../assets/scss/app.scss";

namespace App {
   export 
   interface IState {
      user: string;
      lines: UserCanvas.ILine[];
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

      this.state = {
         user: 'user name',
         lines: [
            {color: 'blue', points: [10, 10, 400, 400]},
            {color: 'green', points: [400, 10, 300, 300]},
         ],
         display: 'landing',
      };

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
         page = (<GameBoard socket={this.socket} {...this.state} />);

      return (
         <PageTransition>
            {page}
         </PageTransition>
      );
   }
}

