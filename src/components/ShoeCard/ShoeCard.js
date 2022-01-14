import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  const variant =
    typeof salePrice === "number"
      ? "on-sale"
      : isNewShoe(releaseDate)
      ? "new-release"
      : "default";

  const prettyVariant =
    typeof salePrice === "number"
      ? "Sale"
      : isNewShoe(releaseDate)
      ? "Just Released!"
      : "";
  console.log("variant", variant);
  console.log("prettyVariant", prettyVariant);
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {prettyVariant && <Flag variant={variant}>{prettyVariant}</Flag>}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color": variant === "on-sale" ? COLORS.gray[700] : undefined,
              "--text-decoration":
                variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice variant={variant}>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1;
`;

const Wrapper = styled.article`
  min-width: 344px;
  flex: 1;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.span`
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
  padding: 0.25rem 0.75rem;
  background-color: ${(props) =>
    props.variant === "new-release" ? COLORS.secondary : COLORS.primary};
  position: absolute;
  right: -5px;
  top: 12px;
  font-size: ${14 / 18} rem;
`;

// We could do composition from Styled Components:

// const SaleFlag = styled(Flag)``
// const NewFlag = styled(Flag)``

export default ShoeCard;
