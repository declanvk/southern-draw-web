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
      set_players: (u: string, b: string) => void;
   }

   export
   interface IState {
      lounge_code: string;
      players: string[];
   }
}

export
class Landing extends React.Component<Landing.IProps, Landing.IState> {
   constructor (props: Landing.IProps) {
      super(props);
      
      this.state = {
         lounge_code: '000000',
         players: ['', '']
      }
   }

   componentDidMount() {
      this.props.socket.on('new_room', (evt: any) => {
         this.setState({
            lounge_code: evt.room_number
         });
      });
      this.props.socket.on('all_players', (data: any) => {
         if (data.players.length == 1) {
            this.setState({
               players: [data.players[0].user_name, '']
            });
         } else if ((data.players.length >= 2)) {
            this.props.set_players(data.players[0].user_name, data.players[1].user_name)
            setTimeout(this.props.transition_func, 3000);
            this.setState({
               players: [data.players[0].user_name, data.players[1].user_name]
            });
         }
      });
   }

   render() {
      return (
         <div className='sd-landing-page transition-item'>
            <div className={'sd-landing-header-spacer'} />
            <div className={'sd-landing-code'} >
               <p>Your lounge code is: <span className="sd-bold">{this.state.lounge_code}</span></p>
            </div>
            <div className={'sd-landing-players-container'}>
               <div className={'sd-landing-players-card'}>
                  <img src={p1_image}  onClick={this.props.transition_func}/>
                  <div className={'sd-landing-players-name'}><p>{this.state.players[0]}</p></div>
               </div>
               <div className={'sd-landing-players-card'}>
                  <img src={p2_image} />
                  <div className={'sd-landing-players-name'}><p>{this.state.players[1]}</p></div>
               </div>
            </div>
         </div>
      );
   }
}