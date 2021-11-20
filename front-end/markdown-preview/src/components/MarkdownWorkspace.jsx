import { useState } from 'react';

import Grid from '@mui/material/Grid';

import { Editor } from './Editor';
import { Preview } from './Preview';

export function MarkdownWorkspace() {
  const [markup, setMarkup] = useState('markup');

  return (
    <Grid container rowSpacing={1} columnSpacing={1} flex="auto">
      <Grid item xs={12} md={6}>
        <Editor markup={markup} setMarkup={setMarkup} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Preview markup={markup} />
      </Grid>
    </Grid>
  );
}
