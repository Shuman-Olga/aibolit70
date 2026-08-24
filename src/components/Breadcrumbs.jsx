import { Link, useMatches } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";

export default function Breadcrumbs() {
  const matches = useMatches();

  const crumbs = matches.filter((m) => m.handle?.crumb);

  if (crumbs.length <= 1) return null;

  return (
    <Container id="breadcrumbs">
      <Breadcrumb>
        {crumbs.map((match, index) => {
          const isFirst = index === 0;
          const isLast = index === crumbs.length - 1;
          return (
            <Breadcrumb.Item
              key={match.pathname}
              linkProps={{ to: match.pathname }}
              linkAs={Link}
              active={isLast}
              className={
                isLast
                  ? "link-warning me-2"
                  : !isFirst
                    ? "underline-one me-2"
                    : "me-2"
              }>
              {isFirst ? (
                <span className="material-icons">home</span>
              ) : (
                match.handle.crumb
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </Container>
  );
}
