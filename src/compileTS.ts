// @ts-ignore
import tsLoader from "next-yak/loaders/tsloader";

export const compileTS = async (code: string) => {
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
    async: () => (err: any, result: any, _: any) => {
      if (err) {
        throw err;
      }
      return result;
    },
  };
  return await tsLoader.call(loaderContext, code);
};
