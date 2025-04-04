import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
 
export default function LoginBtn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("spotify")
      }}
    >
      <Button type="submit">Login</Button>
    </form>
  )
} 
