import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from '../firebase';

const provider = new GoogleAuthProvider();

const loginTest = () => {
  signInWithPopup(authService, provider)
  .then((result) => {

  })
  .catch((error) => {
    alert(error.message);
  })
}

function LoginBtn() {
  return (
    <div>
      <button onClick={loginTest}>Login</button>
    </div>
  );
}

export default LoginBtn;
