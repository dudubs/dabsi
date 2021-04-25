import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
import { MuiTextInputView } from "@dabsi/browser/mui/input/TextInput";
import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
import { MuiFormView } from "@dabsi/browser/mui/form/view";
import MuiRouterLink from "@dabsi/system/admin/browser/MuiRouterLink";
import {
  ContentAdminConnection,
  ContentCategoryData,
  ContentCategoryInput,
  ContentCategoryTable,
} from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterLocationEvent } from "@dabsi/typerouter/event";
import { AnyRouterLocation } from "@dabsi/typerouter/location";
import { RouterView } from "@dabsi/typerouter/view";
import { WidgetViewComponent } from "@dabsi/old-typerpc/widget/view/fn";
import { WidgetViewLoader } from "@dabsi/old-typerpc/widget/view/loader";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import { useLoader } from "@dabsi/view/react/useLoader";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React from "react";

const CategoryContext = React.createContext<ContentCategoryData | null>(null);

const router = ContentAdminRouter.at("categories");

const connection = ContentAdminConnection.categories;

/*

  <SystemView for={}>
*/

const ContentCategoryTableView = WidgetViewComponent(
  ContentCategoryTable,
  props => {
    const emit = useEmitter();

    const category = React.useContext(CategoryContext);

    const item = category?.path[category.path.length - 1];
    return (
      <MuiDataTableView
        TableProps={{ size: "small" }}
        {...props}
        title={lang`CONTENT_CATEGORIES`}
        onDeleteRow={event => connection.item(event.row.$key).delete(null)}
        addButtonTitle={lang`ADD_CATEGORY`}
        onAddNewRow={() => {
          emit(RouterLocationEvent, location => {
            (item
              ? location.find(router)!.at("item", { id: item?.$key! }).at("add")
              : location.find(router)!.at("add")
            ).push();
          });
        }}
        onEditRow={event => {
          emit(RouterLocationEvent, location => {
            location
              .find(router)!
              .at("item", { id: event.row.$key })
              .at("edit")
              .push();
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
          countChildren: {
            MuiTableCellProps: { fitToContent: true },
          },
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
  }
);

function CategoryPage({ children }) {
  return (
    <>
      <CategoryBreadcrumbs />
      {children}
    </>
  );
}

function CategoryBreadcrumbs({}): React.ReactElement {
  const category = React.useContext(CategoryContext);
  return (
    <Breadcrumbs>
      <MuiRouterLink to={router}>{lang`ROOT`}</MuiRouterLink>
      {category?.path.map(category => (
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

SystemView.define(ContentCategoryInput, {
  map: {
    title: props => (
      <MuiTextInputView {...props} title={lang`CATEGORY_TITLE`} />
    ),
  },
});

RouterView.define(router, {
  index: ({ location }) => (
    <WidgetViewLoader connection={connection.table}>
      {props => <ContentCategoryTableView {...props} />}
    </WidgetViewLoader>
  ),

  children: {
    add: ({ location }) => (
      <WidgetViewLoader connection={connection.add}>
        {props => (
          <MuiGrid direction="column" spacing={3}>
            <Typography variant="h5">{lang`ADD_CONTENT_ROOT_CATEGORY`}</Typography>
            <MuiFormView
              {...props}
              onSubmit={({ $key }) => {
                location.parent.push();
              }}
            />
          </MuiGrid>
        )}
      </WidgetViewLoader>
    ),
    item: {
      let($, router) {
        const getItemConnection = (location: AnyRouterLocation) =>
          connection.item(location.find(router)!.params.id);

        // @ts-expect-error
        router.at("foo");

        return $({
          // @ts-expect-error
          asd: 33,
          index: ({ location }) => (
            <WidgetViewLoader
              connection={() => getItemConnection(location).table}
              deps={[location]}
            >
              {props => <ContentCategoryTableView {...props} />}
            </WidgetViewLoader>
          ),

          wrapper: ({ children, location }) => {
            const data = useLoader(
              () => connection.item(location.params.id).get(),
              [location]
            );
            return (
              <CategoryContext.Provider value={data}>
                {children}
              </CategoryContext.Provider>
            );
          },

          children: {
            edit: ({ location }) => (
              <CategoryPage>
                <WidgetViewLoader
                  connection={() => getItemConnection(location).edit}
                >
                  {props => (
                    <MuiFormView
                      {...props}
                      onSubmit={() => {
                        location.parent.push();
                      }}
                    />
                  )}
                </WidgetViewLoader>
              </CategoryPage>
            ),

            add: ({ location }) => (
              <CategoryPage>
                <WidgetViewLoader connection={getItemConnection(location).add}>
                  {props => (
                    <MuiFormView
                      {...props}
                      onSubmit={({ $key }) => {
                        location.parent.push();
                      }}
                    />
                  )}
                </WidgetViewLoader>
              </CategoryPage>
            ),
          },
        });
      },
    },
  },
});
