import React from "react";
import styled from "styled-components/macro";

import SHOES from "../../data";
import ShoeCard from "../ShoeCard";

const ShoeGrid = () => {
  return (
    <Wrapper>
      {/* We could add here a ShoeWrapper to adjust the widht so it is not dependant on the item for later reuse  */}
      {SHOES.map((shoe) => (
        <ShoeCard key={shoe.slug} {...shoe} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 62px 32px;
`;

export default ShoeGrid;
