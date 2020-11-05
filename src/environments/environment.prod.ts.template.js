// Output should be a valid TS-file:
module.exports = `// THIS FILE IS GENERATED BY 'npm run set-env-variables'

export const environment = {
  production: ${process.env.NG_PRODUCTION || true},

  // Feature-switches:
  isDebug: ${process.env.NG_IS_DEBUG || "false"},
  showDebug: ${process.env.NG_SHOW_DEBUG || "false"},
  useAnimation: ${process.env.NG_USE_ANIMATION || "true"},

  // Google Sheets API:
  google_sheets_api_url: '${process.env.GOOGLE_SHEETS_API_URL}',
  google_sheets_sheet_id: '${process.env.GOOGLE_SHEETS_SHEET_ID}',
};
`;
