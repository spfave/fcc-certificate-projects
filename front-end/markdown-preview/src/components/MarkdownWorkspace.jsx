import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { Editor } from './Editor';
import { Preview } from './Preview';

// import markdown from 'assets/markdown-demo.md';
import { markdown } from 'assets/markdown-demo';

export function MarkdownWorkspace() {
  const [markup, setMarkup] = useState(markdown);

  // Note: async method does not pass test
  // useEffect(() => {
  //   fetch(markdown)
  //     .then((res) => res.text())
  //     .then((md) => setMarkup(md));
  // }, []);

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
