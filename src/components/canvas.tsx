import * as React from "react";
import { Stage, Layer, Line, Text } from 'react-konva';

var STAGE = (Stage as any);

export
namespace UserCanvas {
   export
   interface ILine {
      color: string;
      points: number[]; // [x1 y1 x2 y2 ...]
   }

   export
   interface IProps {
      user: string;
      lines: ILine[];
   }
}

export
class UserCanvas extends React.Component<UserCanvas.IProps, undefined> {
   render() {
      const lines = this.props.lines.map((l, idx) => {
         return (
            <Line points={l.points} stroke={l.color} strokeWidth={10} key={idx} />
         )
      });
      return (
         <STAGE width={300} height={500} className='sd-user-canvas'>
            <Layer>
               {lines}
            </Layer>
         </STAGE>
      );
   }
}

namespace GameBoard {
   export 
   interface IProps {
      socket: SocketIO.Socket;
   }
   export 
   interface IState {
      user1: string;
      user1_lines: UserCanvas.ILine[];
      user2: string;
      user2_lines: UserCanvas.ILine[];
   }
}

export 
class GameBoard extends React.Component<GameBoard.IProps, GameBoard.IState> {
   constructor(props: GameBoard.IProps) {
      super(props);

      this.state = {
         user1: 'user1 name',
         user1_lines: [],
         user2: 'user2 name',
         user2_lines: [],
      };
   }

   componentDidMount() {
      this.props.socket.on('draw_data_web', (data: any) => {
         let lines: UserCanvas.ILine[] = data.lines.map(l => {
            let points: number[] = [];
            l.points.forEach(p => {
               points.push(p.x, p.y);
            });
            return {color: l.color, points: points};
         });

         if (data.user_name == this.state.user1) {
            this.setState({
               user1_lines: lines
            });
         } else {
            this.setState({
               user2_lines: lines
            });
         }
      })
   }

   render() {
      return (
         <div className='sd-game-board transition-item'>
            <div className='sd-header-spacer'/>
            <div className='sd-content-container'>
               <div className='sd-canvas-left'>
                  <UserCanvas user={this.state.user1} lines={this.state.user1_lines}/>
               </div>
               <div className='sd-canvas-right'>
                  <UserCanvas user={this.state.user2} lines={this.state.user2_lines}/>
               </div>
            </div>
         </div>
      );
   }
}