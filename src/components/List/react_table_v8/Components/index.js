import {
  Tr as ChakraTr,
  Td as ChakraTd,
  useStyleConfig
} from "@chakra-ui/react";
import LightTooltip from "./LightTooltip";
import highlight from "./highlight";
import Pagination from "./Pagination";

/** These could be bit components */
/** Basic styling that applies to ALL tables goes in here */

const Tr = ({ children, isExpanded, ...customStyles }) => {
  const styles = useStyleConfig("Badge", {});

  return (
    <ChakraTr
      __css={styles}
      {...customStyles}
      borderBottom={{ base: `${isExpanded ? "" : "2px solid #EDF2F7"}` }}
    >
      {children}
    </ChakraTr>
  );
};

const Td = ({ children, ...customStyles }) => (
  <ChakraTd {...customStyles} borderBottom={{ base: "0" }}>
    {children}
  </ChakraTd>
);

export { Tr, Td, LightTooltip, highlight, Pagination };
