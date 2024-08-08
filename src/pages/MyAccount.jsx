import AccountMain from "../features/account/AccountMain";
import AccountTop from "../features/account/AccountTop";
import DeleteAccount from "../features/account/DeleteAccount";

function myAccount() {
  return (
    <>
      <AccountTop />
      <AccountMain />
      <DeleteAccount />
    </>
  );
}

export default myAccount;
