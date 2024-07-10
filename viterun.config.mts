import {resolve} from 'node:path';
import {defineViteRunConfig, viteRunLogPlugin, ViteRunHandleFunctionOptions} from "vite-run";
import dtsPlugin from "vite-plugin-dts";

export default defineViteRunConfig({
  baseConfig: getBaseConfig,
  packages: [
    './'
  ],
  targets: {
    '@biggerstar-hook-server': {
      build: [
        ['es', 'build_lib'],
        ['cjs', 'build_lib'],
      ],
      dev: [
        ['es', 'watch', 'build_lib']
      ]
    },
  },
  build: {
    es: {
      lib: {
        formats: ['es']
      },
    },
    cjs: {
      lib: {
        formats: ['cjs']
      },
    },
    watch: {
      watch: {},
    },
    minify: {
      minify: true
    },
    build_lib: (options: ViteRunHandleFunctionOptions) => {
      return {
        lib: {
          entry: resolve(options.packagePath, 'src/index.ts'),
          name: options.name,
          fileName: (fm: string) => {
            return fm === 'es' ? `index.js` : `index.cjs`;
          },
        },
        rollupOptions: {
          external: [
            'express',
          ],
          output: {}
        },
      }
    },
  },
})

function getBaseConfig(options: ViteRunHandleFunctionOptions) {
  return {
    resolve: {
      extensions: [".ts", ".js", '.d.ts', '.css'],
      alias: {
        "@": resolve(options.packagePath, 'src'),
        types: resolve(options.packagePath, 'src/types')
      }
    },
    build: {
      emptyOutDir: false,
      rollupOptions: {
        output: {
          sourcemap: false,
        },
        treeshake: true
      },
    },
    plugins: [
      dtsPlugin({
        rollupTypes: true,
        copyDtsFiles: true,
      }),
      viteRunLogPlugin({
        // server: {
        //     viteLog: true,
        //     viteRunLog: {
        //        sizeAntOutputPrint:false
        //     }
        // }
      }),
    ]
  }
}
