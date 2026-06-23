import { redirect } from "next/navigation";

function Button({ path, children }) {
  return <button onClick={() => redirect(path)}>{children}</button>;
}

export default Button;
