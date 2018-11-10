import * as React from "react";
import {UserCanvas} from './canvas';
import "./../assets/scss/app.scss";

namespace App {
   export 
   interface IProps {
   }
}

export 
default class App extends React.Component<App.IProps, undefined> {
   render() {
   let lines: UserCanvas.Line[] = [
      {color: 'blue', points: [10, 10, 400, 400]},
      {color: 'red', points: [400, 10, 300, 300]},
   ]
   return (
      <div className="app">
         <p> Hello World </p>
            <UserCanvas user={'name'} lines={lines}/>
      </div>
   );
   }
}

