import { Link, useMatches } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";

export default function Breadcrumbs() {
  const matches = useMatches();

  // Берём только маршруты, у которых определён breadcrumb
  const crumbs = matches
    .filter((match) => match.handle?.crumb)
    .filter(
      (match, index, array) =>
        index === array.findIndex((item) => item.pathname === match.pathname),
    );

  // Для главной страницы или одного breadcrumb
  // хлебные крошки не показываем
  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <Container id="breadcrumbs">
      <Breadcrumb>
        {crumbs.map((match, index) => {
          const isFirst = index === 0;
          const isLast = index === crumbs.length - 1;

          return (
            <Breadcrumb.Item
              key={`${match.id ?? "route"}-${match.pathname}-${index}`}
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
                <span className="material-icons" aria-hidden="true">
                  home
                </span>
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
