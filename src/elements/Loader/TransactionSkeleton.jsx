/* eslint-disable react/prop-types */
import {  Box, Stack } from "@chakra-ui/react";
import SkeletonLoader from "./Skeleton";

function TransactionSkeleton({ length, width }) {
  return (
    <Stack>
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="skeleton-product">
          <Box my={3} mx={3}>
          <SkeletonLoader width={"50px"} height={"50px"} border={"50px"} />
          </Box>
          <div>
            <div className="skeleton-title">
              <SkeletonLoader width={width} height={"16px"} />
            </div>
            <div className="paragraph">
              <SkeletonLoader width={"95%"} height={"10px"} />
            </div>
          </div>
        </div>
      ))}
    </Stack>
  );
}

export default TransactionSkeleton;
