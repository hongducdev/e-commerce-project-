import React, {memo} from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {Link} from "react-router-dom";

const Breadcrumbs = ({title, category}) => {
  const routes = [
    {path: "/:category", breadcrumb: category},
    {
      path: "/",
      breadcrumb: "Home"
    },
    {path: "/:category/:pid/:slug", breadcrumb: title}
  ]

  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className='text-sm flex items-center'>
      {
        breadcrumbs
          .filter(el => !el.match.route === false)
          .map(({ match, breadcrumb, index, self }) => (
            <Link to={match.pathname} key={match.pathname}>
              {breadcrumb}
              {self && index !== self.length - 1 && <span className='mx-1'>/</span>}
            </Link>
          ))
      }
    </div>
  )
}

export default memo(Breadcrumbs)