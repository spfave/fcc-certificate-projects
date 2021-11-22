import CssBaseline from '@mui/material/CssBaseline';
import styled from '@mui/system/styled';

import { Footer } from 'components/Footer';
import { MarkdownWorkspace } from 'components/MarkdownWorkspace';

const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export default function App() {
  return (
    <RootContainer>
      <CssBaseline />
      {/* <Header /> */}
      <MarkdownWorkspace />
      <Footer />
    </RootContainer>
  );
}
