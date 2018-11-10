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
      console.log(lines)
      return (
         <STAGE width={500} height={1000}>
            <Layer>
               {lines}
            </Layer>
         </STAGE>
      );
   }
}