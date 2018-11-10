import * as React from "react";
import * as io from "socket.io-client";
import {UserCanvas} from './canvas';
import "./../assets/scss/app.scss";

namespace App {
   export 
   interface IState {
      user: string;
      lines: UserCanvas.ILine[];
   }
   export 
   interface IProps {
   }
}

export 
default class App extends React.Component<App.IProps, App.IState> {
   constructor(props: App.IProps) {
      super(props);

      this.state = {
         user: 'user name',
         lines: [
            {color: 'blue', points: [10, 10, 400, 400]},
            {color: 'red', points: [400, 10, 300, 300]},
         ]
      };
   }

   componentDidMount() {

   }

   render() {
      let lines: UserCanvas.ILine[] = [
         {color: 'blue', points: [10, 10, 400, 400]},
         {color: 'red', points: [400, 10, 300, 300]},
      ]
      return (
         <div className="app">
            <p> Hello World </p>
               <UserCanvas user={this.state.user} lines={this.state.lines}/>
         </div>
      );
   }
}

