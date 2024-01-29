import React from "react";
import { render } from "react-dom";
import VisibilitySensor from "react-visibility-sensor";

// Import module and default styles
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progressbar = (props) => {
  const diff = props?.diff
  const total = props?.total
  const multDiff = diff * 10
  // const minusDiff = 100 - multDiff
  // const totalDiff = multDiff + minusDiff
  return (
    <div className='text-center'>
      <div style={{ width: "100px" }}>
        <VisibilitySensor>
          {({ isVisible }) => {
            // const percentageDiff = diff * 14 + 2;
            // const percentageTotal = total * 14 + 2;
            return <CircularProgressbar value={multDiff ? multDiff : 0} text={`${diff ? diff : 0} hrs`} />;
          }}
        </VisibilitySensor>
      </div>
    </div>
  );
};
export default Progressbar;
