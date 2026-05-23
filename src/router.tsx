import React from 'react';

interface Route {
  path: string;
  element: React.ReactNode;
}

interface RouterProps {
  routes: Route[];
}

export function Router({ routes }: RouterProps) {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const route = routes.find(r => r.path === currentPath) || routes.find(r => r.path === '*');

  return (
    <>
      {route?.element}
    </>
  );
}

export function Link({ to, children, className, onClick, style, ...rest }: {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  [key: string]: any;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a href={to} onClick={handleClick} className={className} style={style} {...rest}>
      {children}
    </a>
  );
}

export function useNavigate() {
  return (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
}

export function useParams() {
  const path = window.location.pathname;
  const segments = path.split('/');
  return {
    id: segments[segments.length - 1]
  };
}

export function useLocation() {
  return {
    pathname: window.location.pathname
  };
}
