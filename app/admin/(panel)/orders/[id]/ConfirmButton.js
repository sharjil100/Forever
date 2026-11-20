'use client';
import { useFormStatus } from 'react-dom';

export default function ConfirmButton({ message, children }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-full adm-danger" disabled={pending}
      onClick={(e) => { if (!window.confirm(message)) e.preventDefault(); }}>
      {pending ? 'Working…' : children}
    </button>
  );
}
