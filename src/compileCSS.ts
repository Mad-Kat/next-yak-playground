// @ts-ignore
import cssLoader from "next-yak/loaders/cssloader";

export const compileCSS = async (css: string) => {
  const loaderContext = {
    resourcePath: "/some/path/to/file.tsx",
    rootContext: "/some",
    importModule: () => {
      return {
        queries: {
          sm: "@media (min-width: 640px)",
          md: "@media (min-width: 768px)",
          lg: "@media (min-width: 1024px)",
          xl: "@media (min-width: 1280px)",
          xxl: "@media (min-width: 1536px)",
        },
      };
    },
  };
  return await cssLoader.call(loaderContext, css);
};
