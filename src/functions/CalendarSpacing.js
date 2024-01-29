export const CalendarSpacing = (day) => {
  switch (day) {
    case "Sunday":
      return <></>;
    case "Monday":
      return (
        <>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Tuesday":
      return (
        <>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Wednesday":
      return (
        <>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Thursday":
      return (
        <>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Friday":
      return (
        <>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Saturday":
      return (
        <>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    default:
      return 0;
  }
};


export const CalendarSpacingRight = (day) => {
  switch (day) {
    case "Sunday":
      return <></>;
    case "Monday":
      return (
        <>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Tuesday":
      return (
        <>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Wednesday":
      return (
        <>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Thursday":
      return (
        <>
          
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Friday":
      return (
        <>
          
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    case "Saturday":
      return (
        <>
          
          <div
            class="table-box"
            style={{ width: `${100 / 7}%`, borderLeft: "1px solid" }}
          ></div>
        </>
      );
    default:
      return 0;
  }
};