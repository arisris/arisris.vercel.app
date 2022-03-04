import Layout, { LayoutProps } from "./Layout";
import {
  FaCode,
  FaImage,
  FaJs,
  FaLink,
  FaLock,
  FaMarkdown,
  FaQrcode
} from "react-icons/fa";
import Router from "next/router";
import { SideMenu, SideMenuItemProps } from "./SideMenu";
import clsx from "clsx";

const menuItem: SideMenuItemProps[] = [
  {
    title: "Hash",
    icon: FaLock,
    onClick: () => {
      Router.push("/tools/hash");
    }
  },
  {
    title: "Base64 Encode/Decode",
    icon: FaCode,
    onClick: () => {
      Router.push("/tools/base64");
    }
  },
  {
    title: "URL Encode/Decode",
    icon: FaLink,
    onClick: () => {
      Router.push("/tools/urlencode");
    }
  },
  {
    title: "HTML To Markdown",
    icon: FaMarkdown,
    onClick: () => {
      Router.push("/tools/html-to-markdown");
    }
  },
  {
    title: "Markdown To HTML",
    icon: FaMarkdown,
    onClick: () => {
      Router.push("/tools/markdown-to-html");
    }
  },
  {
    title: "Online JS Bundler",
    icon: FaJs,
    onClick: () => {
      Router.push("/tools/bundler");
    }
  }
  // {
  //   title: "QR Code Generator",
  //   icon: FaQrcode
  // },
  // {
  //   title: "Image To Base64",
  //   icon: FaImage
  // },
];

function LayoutTools({
  children,
  ...props
}: LayoutProps & { hiddenPanel?: boolean }) {
  return (
    <Layout {...props}>
      <div className="flex flex-col sm:flex-row gap-6">
        {!props.hiddenPanel && (
          <div className="relative w-full sm:w-3/12">
            <SideMenu menuItem={menuItem} />
          </div>
        )}
        <div
          className={clsx("w-full py-2 block", {
            "sm:w-9/12": !props.hiddenPanel,
            "sm:min-w-full": props.hiddenPanel
          })}
        >
          {props.title && <h1 className="text-2xl font-bold">{props.title}</h1>}
          {props.description && (
            <div className="text-sm">{props.description}</div>
          )}
          <div className="prose dark:prose-invert min-w-full mt-2 pt-4 border-t dark:border-gray-800">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default LayoutTools;
