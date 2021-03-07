import { WidgetViewFn } from "@dabsi/typerpc/widget/WidgetViewFn";
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
import { AnyRouterLocation } from "@dabsi/typerouter/location";
import { RouterView } from "@dabsi/typerouter/view";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import { RouterLocationEvent } from "@dabsi/typerouter/event";
import { Emittable } from "@dabsi/view/react/reactor/Reactor";

SystemView.define(ContentCategoryInput.at("map").at("title"), props => {
  return <MuiTextInputView {...props} title={lang`CATEGORY_TITLE`} />;
});

const getItemConnection = (location: AnyRouterLocation) =>
  connection.item(location.find(router.at("item"))!.params.id);

const CategoryContext = React.createContext<ContentCategoryData | null>(null);

const router = ContentAdminRouter.at("categories");

const connection = ContentAdminConnection.categories;

// SystemView.define(ContentCategoryTable, props => {
//   return (
//     <MuiDataTableView
//       {...props}
//       // title={lang`CONTENT_CATEGORIES`}
//       onEditClick={() => {}}
//       // addAction={{ title: lang`ADD_SUB_CATEGORY`, onClick: () => {} }}
//     />
//   );
// });

WidgetRouterView.define(router, connection.table, (props, { location }) => {
  const table = (
    <MuiDataTableView
      {...props}
      title={lang`CONTENT_CATEGORIES`}
      columns={{
        title: {
          renderRowColumn: ({ data, row }) => (
            <Link
              href="#"
              onClick={() => {
                location.find(router)!.at("item", { id: row.$key }).push();
              }}
            >
              {data}
            </Link>
          ),
        },
      }}
      onEditClick={event => {
        location.at("item", { id: event.row.$key }).push();
      }}
      addAction={{
        title: lang`CREATE_NEW_CATEGORY`,
        onClick: () => {
          location.at("add").push();
        },
      }}
    />
  );
  return table;
});

WidgetRouterView.define(
  router.at("add"),
  connection.addForm,
  (props, { location }) => {
    return (
      <MuiGrid direction="column" spacing={3}>
        <Typography variant="h5">{lang`ADD_CONTENT_ROOT_CATEGORY`}</Typography>
        <MuiFormView
          {...props}
          onSubmit={({ $key }) => {
            location.find(router)!.at("item", { id: $key }).push();
          }}
        />
      </MuiGrid>
    );
  }
);

WidgetRouterView.define(
  router.at("item").at("edit"),
  (_, location) => getItemConnection(location).editForm,
  (props, { location }) => {
    return <SystemView {...props} />;
  }
);
WidgetRouterView.define(
  router.at("item").at("add"),
  (_, location) => getItemConnection(location).addForm,
  (props, { location }) => {
    return (
      <MuiFormView
        {...props}
        onSubmit={({ $key }) => {
          location.parent.push();
        }}
      />
    );
  }
);

const x = (
  props: WidgetViewProps<RpcConnection<typeof ContentCategoryTable>>
) => {
  const emit = useEmitter();
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
        <TableRow>
          <TableCell colSpan={1000}>
            <CategoryBreadcrumbs />
          </TableCell>
        </TableRow>
      }
    />
  );
};
WidgetRouterView.define(
  router.at("item"),
  (_, location) => getItemConnection(location).table,
  (props, { location }) => {
    return (
      <MuiGrid direction="column" spacing={3}>
        <MuiDataTableView
          {...props}
          title={lang`CONTENT_CATEGORIES`}
          addAction={{
            title: lang`ADD_SUB_CATEGORY`,
            onClick: () => {},
          }}
          onEditClick={event => {
            location.parent.at("item", { id: event.row.$key }).push();
          }}
          beforeHead={
            <TableRow>
              <TableCell colSpan={1000}>
                <CategoryBreadcrumbs />
              </TableCell>
            </TableRow>
          }
        />
      </MuiGrid>
    );
  }
);

RouterView.define(
  router.at("item"),
  { wrapper: true },
  ({ id }) => connection.item(id).get(),
  ({ data, children, location }) => {
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
      <Link
        href="#"
        onClick={() => {
          // location.parent.push();
        }}
      >{lang`ROOT`}</Link>
      {category.path.reverse().map(category => (
        <Link
          href="#"
          key={category.$key}
          onClick={() => {
            // location.parent.at("item", { id: category.$key }).push();
            emit(RouterLocationEvent, location => {
              location.find(router)!.at("item", { id: category.$key }).push();
            });
          }}
        >
          {category.title}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
