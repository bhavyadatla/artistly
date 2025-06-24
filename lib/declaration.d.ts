// Prevent eslint error for `any` when importing JSON
declare module "*.json" {
  const value: unknown; // avoids eslint error with `any`
  export default value;
}
