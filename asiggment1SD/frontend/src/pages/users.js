import React from "react";
import UsersTable from "../components/tables/users";

function UsersPage() {
  return (
    <div>
      <div className="mx-5 mt-6 flex flex-row justify-start space-x-3">
        <div className="h-10 w-3 bg-[#0DE6AC]"></div>
        <div className="w-3 text-center font-sans text-xl font-bold">
          <h1>Users</h1>
        </div>
      </div>
      <UsersTable />
    </div>
  );
}

export default UsersPage;
