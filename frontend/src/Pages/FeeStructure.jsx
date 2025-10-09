import React, { useState } from "react";
import bus from "../assets/bus.jpg";
import studentread from "../assets/studentread.png";
import feeIcon from "../assets/rupee.png";

const FeeStructure = () => {
  const [selectedClass, setSelectedClass] = useState("");

  const feeData = [
    { class: "Nursery", entranceFee: 950, annualFee: 1200, monthlyFee: 900, examFee: 300, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 0 },
    { class: "LKG", entranceFee: 950, annualFee: 1500, monthlyFee: 1000, examFee: 400, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 1000 },
    { class: "UKG", entranceFee: 950, annualFee: 1500, monthlyFee: 1050, examFee: 400, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 1000 },
    { class: "Class 1", entranceFee: 1250, annualFee: 1800, monthlyFee: 1150, examFee: 500, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 1500 },
    { class: "Class 2", entranceFee: 1250, annualFee: 1800, monthlyFee: 1250, examFee: 500, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 1500 },
    { class: "Class 3", entranceFee: 1250, annualFee: 1800, monthlyFee: 1350, examFee: 500, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 1500 },
    { class: "Class 4", entranceFee: 1250, annualFee: 1800, monthlyFee: 1450, examFee: 600, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 1500 },
    { class: "Class 5", entranceFee: 1250, annualFee: 1800, monthlyFee: 1600, examFee: 600, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 1500 },
    { class: "Class 6", entranceFee: 1500, annualFee: 2000, monthlyFee: 1800, examFee: 700, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 1500 },
    { class: "Class 7", entranceFee: 1500, annualFee: 2000, monthlyFee: 2000, examFee: 700, beltFee: 200, longTie: 150, shortTie: 100, tcFee: 1500 },
  ];

  // Transportation fees for different locations
  const transportationFees = [
    { location: "Lalpur", fee: 550 },
    { location: "Banauli", fee: 550 },
    { location: "Dangrahi", fee: 550 },
    { location: "Belha", fee: 550 }
  ];

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mb-10 mt-10 print-container">
      {/* Heading with PNG icon */}
      <h2 className="text-3xl text-[#263675] font-bold text-center mb-6 flex justify-center items-center gap-2 print-heading">
        <img src={feeIcon} alt="Fee Icon" className="w-8 h-8 print-icon" />
        School Fee Structure
      </h2>

      {/* Images Section */}
      <div className="flex justify-between items-end mb-6 mt-10 no-print">
        <img
          src={studentread}
          alt="Student Reading"
          className="w-32 h-32 object-cover rounded-lg"
        />

        <div className="relative">
          <img
            src={bus}
            alt="Bus"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-2 w-24 h-3 bg-black/20 rounded-full blur-md"></div>
        </div>
      </div>

      {/* Filter and Print Button */}
      <div className="flex justify-between items-center mb-4 no-print">
        <button
          onClick={handlePrint}
          className="bg-[#263675] hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Fee Structure
        </button>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">All Classes</option>
          {feeData.map((item, i) => (
            <option key={i} value={item.class}>
              {item.class}
            </option>
          ))}
        </select>
      </div>

      {/* Fee Table */}
      <div className="overflow-x-auto print-landscape">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow print-table">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Entrance Fee</th>
              <th className="border px-4 py-2">Annual Fee</th>
              <th className="border px-4 py-2">Monthly Fee</th>
              <th className="border px-4 py-2">Exam Fee</th>
              <th className="border px-4 py-2">Belt Fee</th>
              <th className="border px-4 py-2">Long Tie</th>
              <th className="border px-4 py-2">Short Tie</th>
              <th className="border px-4 py-2">T.C Fee</th>
              <th className="border px-4 py-2">Transportation (Monthly)</th>
            </tr>
          </thead>

          <tbody>
            {feeData
              .filter((item) => !selectedClass || item.class === selectedClass)
              .map((item, index) => (
                <tr
                  key={index}
                  className="transition-colors duration-200 bg-white hover:bg-blue-50"
                >
                  {/* Class column */}
                  <td className="border px-4 py-2 text-center font-medium">{item.class}</td>
                  
                  <td className="border px-4 py-2 text-center">₹{item.entranceFee}</td>
                  <td className="border px-4 py-2 text-center">₹{item.annualFee}</td>
                  <td className="border px-4 py-2 text-center">₹{item.monthlyFee}</td>
                  <td className="border px-4 py-2 text-center">₹{item.examFee}</td>
                  <td className="border px-4 py-2 text-center">₹{item.beltFee}</td>
                  <td className="border px-4 py-2 text-center">₹{item.longTie}</td>
                  <td className="border px-4 py-2 text-center">₹{item.shortTie}</td>
                  <td className="border px-4 py-2 text-center">{item.tcFee === 0 ? "-" : `₹${item.tcFee}`}</td>

                  {/* Transportation Fee with different locations */}
                  {index === 0 && (
                    <td
                      rowSpan={feeData.length}
                      className="align-top px-4 py-2 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        {transportationFees.map((transport, i) => (
                          <div key={i} className="flex justify-between w-full px-2">
                            <span>{transport.location}:</span>
                            <span>₹{transport.fee}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Notes Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 print-notes">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">शुल्क सम्बन्धी नियमहरु :</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
          <li>मासिक शुल्क बुझाउँदा अनिवार्य रूपमा बिल लिनु पर्ने छ।</li>
          <li>प्रत्येक महिनाको मासिक शुल्क सोही महिनाको अन्त्यमा (मसान्तभित्र) वा ५ गतेभित्र बुझाउँमा २% छुट दिइने छ।</li>
          <li>विद्यार्थीहरूको मासिक शुल्क एकमुष्ट ६ महिना सम्मको अग्रिम बुझाउँमा ५% र १२ महिनासम्मको बुझाउँमा १०% सहुलियत छुट दिइने छ।</li>
          <li>विद्यार्थीले अध्ययन गरेको ३ महिनासम्म पनि मासिक शुल्क नबुझाउँमा ५% का दरले लेट फाइन तिराउनु पर्नेछ।</li>
          <li>विद्यालयको उत्कृष्ट विद्यार्थीले मासिक ३ महिनासम्मको शुल्क बुझाउँमा ३०% सहुलियत छुट दिइने छ।</li>
          <li>प्रत्येक कक्षाको प्रथम हुने वा जनतालिसमा नाम समावेश हुने विद्यार्थीलाई शुल्क बुझाउँमा १०% सहुलियत छुट दिइने छ।</li>
          <li>विद्यालयले निर्धारण गरेको शुल्क नियम अनुसार नगरेमा सहुलियत कटाई छुट गरिने छैन।</li>
        </ul>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          /* Hide navigation and other elements */
          .no-print {
            display: none !important;
          }
          
          /* Reset body and html for printing */
          body, html {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: white !important;
            color: black !important;
            font-size: 12px;
          }
          
          /* Force landscape orientation */
          @page {
            size: landscape;
            margin: 0.5cm;
          }
          
          /* Main container for centering */
          .print-container {
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: center !important;
            min-height: 100vh !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          
          /* Heading styles for print - fixed at top */
          .print-heading {
            text-align: center;
            font-size: 24px !important;
            margin: 0 0 20px 0 !important;
            color: #263675 !important;
            width: 100%;
            flex-shrink: 0;
          }
          
          .print-icon {
            width: 24px !important;
            height: 24px !important;
          }
          
          /* Table container - centered vertically */
          .print-landscape {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            flex-grow: 1 !important;
            margin: 0 !important;
          }
          
          .print-table {
            width: 95% !important;
            font-size: 10px !important;
            border-collapse: collapse !important;
            border: 1px solid #000 !important;
            margin: 0 auto !important;
          }
          
          .print-table th,
          .print-table td {
            padding: 4px 6px !important;
            border: 1px solid #000 !important;
            text-align: center !important;
          }
          
          .print-table th {
            background-color: #f3f4f6 !important;
            font-weight: bold !important;
            color: #000 !important;
          }
          
          .print-table td {
            background-color: white !important;
            color: #000 !important;
          }
          
          /* Notes section styling - at bottom */
          .print-notes {
            display: block !important;
            margin-top: auto !important;
            padding: 10px !important;
            border: 1px solid #000 !important;
            background-color: #f9fafb !important;
            page-break-inside: avoid;
            width: 95% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          .print-notes h3 {
            font-size: 14px !important;
            margin-bottom: 8px !important;
            color: #000 !important;
          }
          
          .print-notes ul {
            font-size: 10px !important;
            margin: 0 !important;
            padding-left: 15px !important;
            color: #000 !important;
          }
          
          .print-notes li {
            margin-bottom: 3px !important;
          }
          
          /* Ensure proper page breaks */
          table {
            page-break-inside: auto;
          }
          
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          
          /* Hide all other elements on the page */
          body * {
            visibility: hidden;
          }
          
          .print-container,
          .print-container * {
            visibility: visible;
          }
          
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FeeStructure;