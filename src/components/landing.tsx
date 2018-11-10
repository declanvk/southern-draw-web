import * as React from "react";
import { Stage, Layer, Line, Text } from 'react-konva';

const p1_image = require("./../assets/img/p1.png");
const p2_image = require("./../assets/img/p2.png");

var STAGE = (Stage as any);

export
namespace Landing {
   export
   interface IProps {
      lounge_code: string;
   }
}

export
function Landing (props: Landing.IProps) {
   return (
      <div className='sd-landing-page transition-item'>
         <div className={'sd-landing-header-spacer'} />
         <div className={'sd-landing-code'}>
            <p>Your lounge code is: <span className="sd-bold">{props.lounge_code}</span></p>
         </div>
         <div className={'sd-landing-players-container'}>
            <img src={p1_image} />
            <img src={p2_image} />
         </div>
      </div>
   );
}