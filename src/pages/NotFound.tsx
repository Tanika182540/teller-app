import React, { useState } from "react";
import Input from "../shared/components/Input.component";


export default function NotFound() {
  const [email, setEmail] = useState<string>("");
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Input title="Email" value={email} onChange={setEmail} />
    </div>
  );
}
