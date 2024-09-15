import {Heading, Flex, Card} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

export default function IssueDetailsFallback() {
  return (
    <div className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="3" align="center" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="mt-4">
        <Skeleton className="mb-5" height={48} />
        <Skeleton className="mb-5" height={48} />
        <Skeleton className="mb-5" height={48} />
        <Skeleton className="mb-5" height={48} />
        <Skeleton className="mb-5" height={48} />
      </Card>
    </div>
  );
}
