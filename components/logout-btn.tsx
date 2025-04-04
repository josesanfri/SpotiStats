import { Button } from "./ui/button";
import { signOut } from "@/auth"
 
const LogoutBtn = () => {
  return (
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
  )
}

export default LogoutBtn;
