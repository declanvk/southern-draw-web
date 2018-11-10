import * as React from "react";
import { Stage, Layer, Line, Text } from 'react-konva';

var STAGE = (Stage as any);

export
namespace Landing {
   export
   interface IProps {
   }
}

export
class Landing extends React.Component<Landing.IProps, undefined> {
   render() {
      return (
         <div className='sd-landing-page transition-item'>
            <p>Hello World</p>
         </div>
      );
   }
}