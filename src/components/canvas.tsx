import * as React from "react";
import { Stage, Layer, Line, Text } from 'react-konva';

var STAGE = (Stage as any);

let canvas_height = 500.0;
let canvas_width = 300.0;

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
            <Line points={l.points} stroke={l.color} strokeWidth={7} key={idx} />
         )
      });
      return (
         <STAGE width={canvas_width} height={canvas_height} className='sd-user-canvas'>
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
      user1: string;
      user2: string;

   }
   export 
   interface IState {
      user1_lines: UserCanvas.ILine[];
      user2_lines: UserCanvas.ILine[];
   }
}

export 
class GameBoard extends React.Component<GameBoard.IProps, GameBoard.IState> {
   constructor(props: GameBoard.IProps) {
      super(props);

      this.state = {
         user1_lines: [],
         user2_lines: [],
      };
   }

   componentDidMount() {
      this.props.socket.on('draw_data_web', (data: any) => {
         console.log(data)
         let lines: UserCanvas.ILine[] = data.lines.map(l => {
            let points: number[] = [];
            l.points.forEach(p => {
               console.log(data.screen_dim.width);
               points.push(p.x * canvas_width / data.screen_dim.width,
                  p.y * canvas_height / data.screen_dim.height);
            });
            return {color: l.color, points: points};
         });

         if (data.user_name == this.props.user1) {
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
                  <UserCanvas user={this.props.user1} lines={this.state.user1_lines}/>
               </div>
               <div className='sd-canvas-right'>
                  <UserCanvas user={this.props.user2} lines={this.state.user2_lines}/>
               </div>
            </div>
         </div>
      );
   }
}