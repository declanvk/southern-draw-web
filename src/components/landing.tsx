import * as React from "react";
import { Stage, Layer, Line, Text } from 'react-konva';
import * as io from "socket.io-client";

const p1_image = require("./../assets/img/p1.png");
const p2_image = require("./../assets/img/p2.png");

var STAGE = (Stage as any);

export
namespace Landing {
   export
   interface IProps {
      socket: SocketIO.Socket;
      transition_func: () => void;
   }

   export
   interface IState {
      lounge_code: string;
   }
}

export
class Landing extends React.Component<Landing.IProps, Landing.IState> {
   constructor (props: Landing.IProps) {
      super(props);
      
      this.state = {
         lounge_code: '000000'
      }

      setTimeout(this.props.transition_func, 1000);
   }

   componentDidMount() {
      this.props.socket.on('new_room', (evt: any) => {
         this.setState({
            lounge_code: evt.room_number
         });
      })
   }

   render() {
      return (
         <div className='sd-landing-page transition-item'>
            <div className={'sd-landing-header-spacer'} />
            <div className={'sd-landing-code'}>
               <p>Your lounge code is: <span className="sd-bold">{this.state.lounge_code}</span></p>
            </div>
            <div className={'sd-landing-players-container'}>
               <img src={p1_image} />
               <img src={p2_image} />
            </div>
         </div>
      );
   }
}