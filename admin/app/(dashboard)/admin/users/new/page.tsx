// "use client";
// import { DashboardSidebar } from "@/components/singitronic";
// import { isValidEmailAddressFormat } from "@/lib/utils";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// const DashboardCreateNewUser = () => {
//   const [userInput, setUserInput] = useState({
//     email: "",
//     password: "",
//   });
//   const router = useRouter();

//   const addNewUser = () => {
//     if (userInput.email.length > 3 && userInput.password.length > 0) {
//       if (!isValidEmailAddressFormat(userInput.email)) {
//         toast.error("You entered invalid email address format");
//         return;
//       }

//       if (userInput.password.length > 7) {
//         const requestOptions = {
//           method: "post",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             ...userInput,
//             role: "staff",
//           }),
//         };
//         fetch(`http://localhost:3001/api/users`, requestOptions)
//           .then((response) => {
//             if (response.status === 201) {
//               return response.json();
//             } else {
//               throw Error("Error while creating user");
//             }
//           })
//           .then((data) => {
//             toast.success("User added successfully");
//             setUserInput({
//               email: "",
//               password: "",
//             });
//             router.push("/admin/users");
//           })
//           .catch((error) => {
//             toast.error("Error while creating user");
//           });
//       } else {
//         toast.error("Password must be longer than 7 characters");
//       }
//     } else {
//       toast.error("You must enter all input values to add a user");
//     }
//   };

//   return (
//     <div className="bg-white flex justify-start  mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
//       <DashboardSidebar />
//       <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
//         <h1 className="text-3xl font-semibold">Add new user</h1>
//         <div>
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text">Email:</span>
//             </div>
//             <input
//               type="email"
//               className="input input-bordered w-full max-w-xs"
//               value={userInput.email}
//               onChange={(e) =>
//                 setUserInput({ ...userInput, email: e.target.value })
//               }
//             />
//           </label>
//         </div>

//         <div>
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text">Password:</span>
//             </div>
//             <input
//               type="password"
//               className="input input-bordered w-full max-w-xs"
//               value={userInput.password}
//               onChange={(e) =>
//                 setUserInput({ ...userInput, password: e.target.value })
//               }
//             />
//           </label>
//         </div>

//         <div className="flex gap-x-2">
//           <button
//             type="button"
//             className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
//             onClick={addNewUser}
//           >
//             Create user
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCreateNewUser;

"use client";
import { DashboardSidebar } from "@/components/vgm";
import { isValidEmailAddressFormat } from "@/lib/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DashboardCreateNewUser = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    role: "staff", // Mặc định là "staff"
  });
  const router = useRouter();

  const addNewUser = () => {
    if (userInput.email.length > 3 && userInput.password.length > 0) {
      if (!isValidEmailAddressFormat(userInput.email)) {
        toast.error("You entered an invalid email address format");
        return;
      }

      if (userInput.password.length > 7) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        };
        fetch(`http://localhost:3001/api/users`, requestOptions)
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            } else {
              throw Error("Error while creating user");
            }
          })
          .then(() => {
            toast.success("User added successfully");
            setUserInput({
              email: "",
              password: "",
              role: "staff", // Reset lại role sau khi thêm user
            });
            router.push("/admin/users");
          })
          .catch(() => {
            toast.error("Error while creating user");
          });
      } else {
        toast.error("Password must be longer than 7 characters");
      }
    } else {
      toast.error("You must enter all input values to add a user");
    }
  };

  return (
    <div className="bg-white flex justify-start  mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Add New User</h1>

        {/* Email */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email:</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
            />
          </label>
        </div>

        {/* Password */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password:</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
          </label>
        </div>

        {/* Role */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Role:</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={userInput.role}
              onChange={(e) =>
                setUserInput({ ...userInput, role: e.target.value })
              }
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
        </div>

        {/* Add Button */}
        <div className="flex gap-x-2">
          <button
            type="button"
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
            onClick={addNewUser}
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCreateNewUser;
