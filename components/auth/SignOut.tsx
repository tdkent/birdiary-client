import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";

export default function SignOut() {
  return (
    <Button variant={"outline"} onClick={async () => await signOut()}>
      Sign Out
    </Button>
  );
}
