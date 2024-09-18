import {Button, Flex, Text} from "@radix-ui/themes";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
}: Props) {
  const totalPages: number = Math.ceil(itemCount / pageSize);
  if (totalPages <= 1) return null;
  return (
    <Flex className="mt-12" align="center" justify="center" gap="4">
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <FaArrowLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={+currentPage === totalPages}
      >
        <FaArrowRight />
      </Button>
    </Flex>
  );
}
