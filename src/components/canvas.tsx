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
      user: string;
      lines: UserCanvas.ILine[];
      socket: SocketIO.Socket;
   }
   export 
   interface IState {
   }
}

export 
class GameBoard extends React.Component<GameBoard.IProps, GameBoard.IState> {
   render() {
      return (
         <div className='sd-game-board transition-item'>
            <div className='sd-header-spacer'/>
            <div className='sd-content-container'>
               <div className='sd-canvas-left'>
                  <UserCanvas user={this.props.user} lines={this.props.lines}/>
               </div>
               <div className='sd-canvas-right'>
                  <UserCanvas user={this.props.user} lines={this.props.lines}/>
               </div>
            </div>
         </div>
      );
   }
}