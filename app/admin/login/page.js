'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '../actions';

function Submit() {
  const { pending } = useFormStatus();
  return <button className="btn btn-dark btn-full" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>;
}

export default function AdminLogin() {
  const [state, action] = useFormState(login, null);
  return (
    <div className="adm-login">
      <form action={action} className="adm-login-box">
        <div className="logo">FOREVER</div>
        <p>Admin</p>
        <label className="co-field">
          <span>Password</span>
          <input type="password" name="password" autoComplete="current-password" autoFocus required />
        </label>
        {state?.error && <p className="co-error">{state.error}</p>}
        <Submit />
      </form>
    </div>
  );
}
