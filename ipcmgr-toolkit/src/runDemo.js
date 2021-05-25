import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import loadGraphClient from "@package/ipcmgr-graphql-client";
import "@icg360/ui-toolkit/css/sagesure.css";
import "@icg360/ui-toolkit/react-day-picker/lib/style.css";
import "../css/styles.css";
import "../css/variables.css";
import "../css/modals.css";
import "../css/utility.css";

/*
This function allows individual modules to be run.
Pass in the module and necessary configuration and the package can be run standalone
*/
export default ({
  Module,
  config = {},
  graphqlEndpoints = [],
  path = "",
  user = {},
  flags = {},
  ...props
}) =>
  loadGraphClient(graphqlEndpoints, config).then(client => {
    render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route
              path={path}
              render={() => (
                <div className="mod-demo">
                  <link
                    href="https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,500,500i,700,700i|Material+Icons"
                    rel="stylesheet"
                  />
                  <Module
                    config={config}
                    user={user}
                    flags={flags}
                    {...props}
                  />
                </div>
              )}
            />
            <Redirect to={path} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>,
      document.querySelector("#app")
    );
  });
