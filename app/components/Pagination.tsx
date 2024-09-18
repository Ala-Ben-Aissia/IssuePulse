"use client";

import {Button, Flex, Text} from "@radix-ui/themes";
import {useRouter, useSearchParams} from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateTo = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;
  return (
    <Flex className="mt-12" align="center" justify="center" gap="4">
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        onClick={() => navigateTo(currentPage - 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <FaArrowLeft />
      </Button>
      <Button
        onClick={() => navigateTo(currentPage + 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === totalPages}
      >
        <FaArrowRight />
      </Button>
    </Flex>
  );
}
