import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'date-fns/_lib/format/longFormatters': 'date-fns/format', // Agregar alias para la ruta faltante
      },
    },
    plugins: [react()],

    server: { 
      host: true, 
      port: 5173
    }
  };
});
