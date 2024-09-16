"use client";

import {Button} from "@radix-ui/themes";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="w-full mt-72 flex flex-col justify-center items-center gap-6">
      <pre className="whitespace-normal">{error.message}</pre>
      <Button color="red" onClick={reset}>
        Try again!
      </Button>
    </div>
  );
}
