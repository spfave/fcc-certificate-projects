import ReactMarkdown from 'react-markdown';

import Typography from '@mui/material/Typography';

export function Preview({ markup }) {
  return (
    <div>
      <div>
        <Typography variant="h5">Preview</Typography>
      </div>
      <div id="preview">
        <ReactMarkdown>{markup}</ReactMarkdown>
      </div>
    </div>
  );
}
