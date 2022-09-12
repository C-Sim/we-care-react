// // import React, { useState } from "react";
// // import Calendar from "react-calendar";
// // import "react-calendar/dist/Calendar.css";

// // export const CalendarSmall = ({ userResults }) => {
//   //this component contains the calendar item and will need to contain the timeline inside it too, so the required states can be set here and not at parent component level
//   //**

//   // set states of calendar date
//   const [calDate, setCalDate] = useState(new Date());
//   const [resultArr, setResultArr] = useState([]);

//   // render each appointment - this will be replaced by a timeline item - and the div in the main return section will be replaced by a "timeline" type component
//   const ResultList = ({ result }) => {
//     const dateFormat = new Date(result.appointmentDate);

//     const startFormat = new Date(result.start);

//     return (
//       <div>
//         <h2>{dateFormat.toLocaleString()}</h2>
//         <ul>
//           <li>{startFormat.toString()}</li>
//           <li>{result.title}</li>
//           <li>
//             {result.carerId.firstName} {result.carerId.lastName}
//           </li>
//           <li>
//             {result.patientId.firstName} {result.patientId.lastName}
//           </li>
//           <li>{result.patientId.patientProfileId.postcode}</li>
//         </ul>
//       </div>
//     );
//   };

//   const EmptyList = () => {
//    return (
//   <div className="result-timeline">
//    <h3>Your day</h3>
//    <h3>No date selected yet or no appointment on that day.</h3>
//   {" "}
//    </div>;
//     );
//   };

//   const onChange = (calDate) => {
//     // change results based on calendar date click
//     setCalDate(calDate);

//     //get filtered results
//     const filteredResults = userResults.filter((result) => {
//       const newResultFormat = new Date(result.appointmentDate)
//         .toLocaleString()
//         .split(",")[0];
//       const newCalDateFormat = calDate.toLocaleString().split(",")[0];
//       return newResultFormat === newCalDateFormat;
//     });

//     setResultArr(filteredResults);
//   };

//   return (
//     <div className="weekView-wrapper">
//       <div className="weekView-calendar">
//         <Calendar onChange={onChange} value={calDate} />
//       </div>
//       {/* to be replaced by a timeline component */}
//       <div className="weekView-timeline">
//         {resultArr.length ? (
//           resultArr.map((result) => (
//             <ResultList result={result} key={result.id} />
//           ))
//         ) : (
//           <EmptyList />
//         )}
//       </div>
//     </div>
//   );
// };
