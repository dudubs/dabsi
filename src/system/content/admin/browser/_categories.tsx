import { WidgetFnView } from "@dabsi/typerpc/widget/WidgetFnView";
import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
import { MuiTextInputView } from "@dabsi/browser/mui/widget/input/MuiTextInputView";
import { MuiDataTableView } from "@dabsi/browser/mui/widget/MuiDataTableView";
import { MuiFormView } from "@dabsi/browser/mui/widget/MuiFormView";
import {
  ContentAdminConnection,
  ContentCategoryData,
  ContentCategoryInput,
  ContentCategoryTable,
} from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterLocationEvent, RouterViewEvent } from "@dabsi/typerouter/event";
import { AnyRouterLocation } from "@dabsi/typerouter/location";
import { RouterView } from "@dabsi/typerouter/view";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import { useLoader } from "@dabsi/view/react/useLoader";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useRoute } from "@dabsi/typerouter/view/context";
import MuiRouterLink from "@dabsi/system/admin/browser/MuiRouterLink";

SystemView.define(ContentCategoryInput.at("map").at("title"), props => {
  return <MuiTextInputView {...props} title={lang`CATEGORY_TITLE`} />;
});

const getItemConnection = (location: AnyRouterLocation) =>
  connection.item(location.find(router.at("item"))!.params.id);

const CategoryContext = React.createContext<ContentCategoryData | null>(null);

const router = ContentAdminRouter.at("categories");

const connection = ContentAdminConnection.categories;

const ContentCategoryTableView = WidgetFnView(ContentCategoryTable, props => {
  const emit = useEmitter();
  const category = React.useContext(CategoryContext);
  const route = useRoute();
  return (
    <MuiDataTableView
      {...props}
      title={lang`CONTENT_CATEGORIES`}
      addAction={{
        title: lang`ADD_SUB_CATEGORY`,
        onClick: () => {},
      }}
      onEditClick={event => {
        emit(RouterLocationEvent, location => {
          location.find(router)!.at("item", { id: event.row.$key }).push();
        });
      }}
      beforeHead={
        category && (
          <TableRow>
            <TableCell colSpan={1000}>
              <CategoryBreadcrumbs />
            </TableCell>
          </TableRow>
        )
      }
      columns={{
        title: {
          renderRowColumn: ({ data, row }) => (
            <MuiRouterLink
              to={location =>
                location.find(router)!.at("item", { id: row.$key })
              }
            >
              {data}
            </MuiRouterLink>
          ),
        },
      }}
    />
  );
});

RouterView.define(router.at("add"), ({ location }) => {
  return (
    <WidgetLoaderView connection={connection.addForm}>
      {props => (
        <MuiGrid direction="column" spacing={3}>
          <Typography variant="h5">{lang`ADD_CONTENT_ROOT_CATEGORY`}</Typography>
          <MuiFormView
            {...props}
            onSubmit={({ $key }) => {
              location.find(router)!.at("item", { id: $key }).push();
            }}
          />
        </MuiGrid>
      )}
    </WidgetLoaderView>
  );
});

RouterView.define(router.at("item").at("edit"), ({ location }) => (
  <WidgetLoaderView connection={() => getItemConnection(location).editForm}>
    {props => <SystemView {...props} />}
  </WidgetLoaderView>
));

RouterView.define(router.at("item").at("add"), ({ location }) => (
  <WidgetLoaderView connection={getItemConnection(location).addForm}>
    {props => (
      <MuiFormView
        {...props}
        onSubmit={({ $key }) => {
          location.parent.push();
        }}
      />
    )}
  </WidgetLoaderView>
));

RouterView.define(router, ({ location }) => (
  <WidgetLoaderView connection={connection.table}>
    {props => <ContentCategoryTableView {...props} />}
  </WidgetLoaderView>
));

RouterView.define(router.at("item"), ({ location }) => (
  <WidgetLoaderView
    connection={() => getItemConnection(location).table}
    deps={[location]}
  >
    {props => (
      <MuiGrid direction="column" spacing={3}>
        <ContentCategoryTableView {...props} />
      </MuiGrid>
    )}
  </WidgetLoaderView>
));

RouterView.define(
  router.at("item"),
  { wrapper: true },
  ({ children, location }) => {
    const data = useLoader(() => connection.item(location.params.id).get(), [
      location,
    ]);
    return (
      <CategoryContext.Provider value={data}>
        {children}
      </CategoryContext.Provider>
    );
  }
);

function CategoryBreadcrumbs({ linkToLast = false }): React.ReactElement {
  const category = React.useContext(CategoryContext)!;
  // useRouterLocation()
  const emit = useEmitter();
  return (
    <Breadcrumbs>
      <MuiRouterLink to={router}>{lang`ROOT`}</MuiRouterLink>
      {category.path.map(category => (
        <MuiRouterLink
          key={category.$key}
          to={location =>
            location.find(router)!.at("item", { id: category.$key })
          }
        >
          {category.title}
        </MuiRouterLink>
      ))}
    </Breadcrumbs>
  );
}

// MuiRouterLink
