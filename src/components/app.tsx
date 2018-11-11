import * as React from "react";
import io from "socket.io-client";
import {GameBoard, UserCanvas} from './canvas';
import {Landing} from './landing';
import PageTransition from 'react-router-page-transition';
import "./../assets/scss/app.scss";

const logo = require("./../assets/img/logo.png");

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
         display: 'landing'
      };

      this.handleChange = this.handleChange.bind(this);

      //setTimeout(this.handleChange, 3000);
   }

   handleChange() {
      this.setState({
         display: 'game'
      })
   }

   componentDidMount() {
      // this.socket = io('/games');
      // this.socket.on('connect', (evt: any) => {

      // })
   }

   render() {
      let page: any;
   
      if (this.state.display == 'landing')
         page = (<Landing lounge_code={'000-000'} />);
      else
         page = (<GameBoard {...this.state} />);

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

