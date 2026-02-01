// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import PageTransition from "../components/PageTransition";

// export default function Approvals() {
//   const [requests, setRequests] = useState([]);

//   const fetchApprovals = async () => {
//     try {
//       const res = await api.get("/admin/pending-customers");
//       setRequests(res.data);
//     } catch {
//       setRequests(
//         Array.from({ length: 10 }, (_, i) => ({
//           id: i + 1,
//           name: `New User ${i + 1}`,
//           email: `newuser${i + 1}@gmail.com`,
//         }))
//       );
//     }
//   };

//   useEffect(() => {
//     fetchApprovals();
//   }, []);

//   const handleAction = async (id, action) => {
//     try {
//       await api.post(`/admin/customers/${id}/${action}`);
//       fetchApprovals();
//     } catch {
//       setRequests((prev) => prev.filter((r) => r.id !== id));
//     }
//   };

//   return (
//     <PageTransition>
//   <div className="bg-white rounded-xl shadow border overflow-hidden">

//     {/* HEADER */}
//     <div className="bg-blue-500 text-white px-6 py-4">
//       <h2 className="text-lg font-semibold">Pending Approvals</h2>
//     </div>

//     {/* TABLE WRAPPER */}
//     <div className="p-6">
//       <table className="w-full text-base">
//         <thead>
//           <tr className="border-b text-left text-gray-600">
//             <th className="py-3">Name</th>
//             <th className="py-3">Email</th>
//             <th className="py-3">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {requests.map((r) => (
//             <tr
//               key={r.id}
//               className="border-b last:border-b-0 hover:bg-gray-50 transition"
//             >
//               <td className="py-3">{r.name}</td>
//               <td className="py-3">{r.email}</td>
//               <td className="py-3 space-x-4">
//                 <button
//                   className="bg-green-500 hover:bg-green-600 text-white 
//              font-semibold px-4 py-1.5 rounded-md 
//              transition shadow-sm"
//                   onClick={() => handleAction(r.id, "approve")}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className="bg-red-500 hover:bg-red-600 text-white 
//              font-semibold px-4 py-1.5 rounded-md 
//              transition shadow-sm"
//                   onClick={() => handleAction(r.id, "reject")}
//                 >
//                   Reject
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//   </div>
// </PageTransition>


//   );
// }
//use above when u have api but donw one also works with api with more beautiful UI

import { useEffect, useState } from "react";
import api from "../../services/api";
import PageTransition from "../components/PageTransition";

/* ------------------ HELPERS (MOCK DATA ONLY) ------------------ */

const randomDate = () => {
  const start = new Date(2025, 8, 1).getTime();
  const end = new Date(2026, 1, 31).getTime();

  return new Date(
    start + Math.random() * (end - start)
  ).toLocaleDateString("en-IN");
};


const randomIdType = () =>
  Math.random() > 0.5 ? "Aadhaar Card" : "PAN Card";

const randomAadhaar = () =>
  `${Math.floor(1000 + Math.random() * 9000)} 
   ${Math.floor(1000 + Math.random() * 9000)} 
   ${Math.floor(1000 + Math.random() * 9000)}`;

const randomPAN = () =>
  `ABCDE${Math.floor(1000 + Math.random() * 9000)}F`;

/* ------------------ COMPONENT ------------------ */

export default function Approvals() {
  const [requests, setRequests] = useState([]);

  const fetchApprovals = async () => {
    try {
      const res = await api.get("/admin/pending-customers");
      setRequests(res.data);
    } catch {
      setRequests(
        Array.from({ length: 7 }, (_, i) => {
          const idType = randomIdType();
          return {
            id: i + 1,
            name: [
              "Aman",
              "Aaditya",
              "Ravi",
              "Kislay",
              "Devansh",
              "Ashwini",
              "Rohit",
            ][i],
            email: `user${i + 1}@gmail.com`,
            date: randomDate(),
            idType,
            idNumber:
              idType === "Aadhaar Card"
                ? randomAadhaar()
                : randomPAN(),
          };
        })
      );
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await api.post(`/admin/customers/${id}/${action}`);
      fetchApprovals();
    } catch {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <PageTransition>
      <div className="bg-white rounded-xl shadow border overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-500 text-white px-6 py-4">
          <h2 className="text-lg font-semibold">Pending Approvals</h2>
        </div>

        {/* TABLE */}
        <div className="p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-3 px-3">User Name</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">ID Type</th>
                <th className="py-3 px-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r) => (
                <tr
                  key={r.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-3 font-medium">{r.name}</td>
                  <td className="py-3 px-3">{r.date}</td>
                  <td className="py-3 px-3">{r.idType}</td>

                  <td className="py-3 px-3 flex gap-3">
                    <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-1.5 rounded-md">
                      View
                    </button>

                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md"
                      onClick={() => handleAction(r.id, "approve")}
                    >
                      Accept
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md"
                      onClick={() => handleAction(r.id, "reject")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </PageTransition>
  );
}


