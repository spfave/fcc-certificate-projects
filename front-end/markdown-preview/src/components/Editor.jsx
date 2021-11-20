import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const MarkdownTextarea = styled('textarea')({
  width: '100%',
  height: '100%',
  resize: 'none',
});

export function Editor({ markup, setMarkup }) {
  return (
    <Column>
      <div>
        <Typography variant="h5">Editor</Typography>
      </div>
      <div style={{ flex: 'auto' }}>
        <MarkdownTextarea
          id="editor"
          placeholder={markup}
          onChange={(e) => setMarkup(e.target.value)}
        ></MarkdownTextarea>
      </div>
    </Column>
  );
}
