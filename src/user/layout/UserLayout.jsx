// import { Outlet } from "react-router-dom";
// import UserSidebar from "../components/UserSidebar";
// import UserHeader from "../components/UserHeader";

// export default function UserLayout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <UserSidebar />

//       <div className="flex-1 flex flex-col">
//         <UserHeader />
//         <main className="p-6 flex-1 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar.jsx";
import UserHeader from "../components/UserHeader.jsx";

export default function UserLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <UserSidebar />

      <div className="flex-1 flex flex-col">
        <UserHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
