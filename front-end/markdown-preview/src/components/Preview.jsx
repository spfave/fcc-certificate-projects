import styled from '@mui/system/styled';
import ReactMarkdown from 'react-markdown';

import Typography from '@mui/material/Typography';

const Column = styled('section')({});

export function Preview({ markup }) {
  return (
    <Column>
      <div>
        <Typography variant="h5">Preview</Typography>
      </div>
      <div id="preview">
        <ReactMarkdown>{markup}</ReactMarkdown>
      </div>
    </Column>
  );
}
