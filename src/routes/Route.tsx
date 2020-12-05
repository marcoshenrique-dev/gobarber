import React from 'react';

import {
   RouteProps as ReactDomRouteProps,
   Route as ReactDomRoute,
   Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDomRouteProps {
   isPrivate?: boolean;
   component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
   isPrivate = false,
   component: Component,
   ...rest
}) => {
   const { user } = useAuth();

   return (
      <ReactDomRoute
         {...rest}
         render={() => {
            return isPrivate === !!user ? (
               <Component />
            ) : (
               <Redirect to={{ pathname: isPrivate ? '/' : 'dashboard' }} />
            );
         }}
      />
   );
};

export default Route;
