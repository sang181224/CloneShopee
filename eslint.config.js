// @ts-check
import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

// Bắt chước __dirname trong ES Modules (cần cho FlatCompat và import/resolver)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Khởi tạo FlatCompat để "dịch" các config cũ
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended // Ánh xạ 'eslint:recommended'
})

export default [
  // 1. Cấu hình IGNORE (thay thế cho .eslintignore)
  {
    ignores: ['node_modules/', 'dist/']
  },

  // 2. Cấu hình ESLint JavaScript cơ bản
  js.configs.recommended,

  // 3. Cấu hình TypeScript (cách mới)
  // eslint-disable-next-line import/no-named-as-default-member
  ...tseslint.configs.recommended,
  // 4. Dùng FlatCompat để tải các config cũ (React, Hooks, Import, A11y)
  // Đây chính là mảng "extends" cũ của bạn
  ...compat.extends(
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended'
  ),

  // 5. Thêm plugin Prettier (để báo lỗi Prettier trong ESLint)
  // Thay thế cho "plugins: ['prettier']" và "rules: {'prettier/prettier': ...}"
  // Nó sẽ tự động đọc file .prettierrc của bạn.
  ...compat.extends('plugin:prettier/recommended'),

  // 6. Cấu hình tùy chỉnh (rules, settings, globals)
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Áp dụng cho các file này
    languageOptions: {
      globals: {
        ...globals.browser, // Môi trường trình duyệt
        ...globals.node // Môi trường Node.js
      }
    },

    // BẮT ĐẦU THAY THẾ TỪ ĐÂY
    settings: {
      react: {
        version: 'detect' // Tự động phát hiện phiên bản React
      },
      'import/resolver': {
        // 1. Thêm bộ giải quyết 'typescript'
        // (Nó sẽ tự động đọc file tsconfig.json của bạn)
        typescript: {
          project: 'tsconfig.json'
        },
        // 2. Giữ lại bộ giải quyết 'node'
        node: {
          paths: [path.resolve(__dirname)],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    // KẾT THÚC THAY THẾ Ở ĐÂY

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'warn'
    }
  },

  // 7. Prettier Config (để TẮT các rule xung đột)
  // (Thay thế cho 'eslint-config-prettier' và 'prettier' trong mảng extends cũ)
  // PHẢI LUÔN LÀ CÁI CUỐI CÙNG trong mảng.
  prettierConfig
]
