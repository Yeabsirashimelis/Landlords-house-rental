"use client";

import AccountMain from "../features/account/AccountMain";
import AccountTop from "../features/account/AccountTop";

function MyAccount() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <AccountTop />
      <AccountMain />
    </div>
  );
}

export default MyAccount;
