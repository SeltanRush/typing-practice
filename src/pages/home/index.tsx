import { RouteComponentProps } from "@reach/router";
import { Breadcrumb } from "antd";
import useCurrentUser from "../../hooks/use-current-user";
import Page from "../base";

export default function Home(_: RouteComponentProps) {
  const user = useCurrentUser();
  return (
    <Page>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background content-container">
        Hi, {user?.name}
      </div>
    </Page>
  );
}
