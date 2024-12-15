import styles from "./page.module.css"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'



export default function Home() {
  return (
    <div className={styles.page}>
       <SignedOut>
      <SignInButton />
    </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      MERCHANT_APP
    </div>
  );
}
