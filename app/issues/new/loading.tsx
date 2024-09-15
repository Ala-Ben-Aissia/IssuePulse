import {Skeleton} from "@/app/components";
import {Box} from "@radix-ui/themes";

export default function Loading() {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" className="mb-2" />
      <Skeleton height="12rem" />
    </Box>
  );
}
