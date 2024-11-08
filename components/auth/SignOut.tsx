import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { signOut as signOutAction } from "@/actions/auth";
import { AuthContext } from "@/context/auth";

export default function SignOut() {
  const { signOut } = useContext(AuthContext);

  async function handleClick() {
    signOut();
    await signOutAction();
  }

  return (
    <Button variant={"outline"} onClick={handleClick}>
      Sign Out
    </Button>
  );
}
