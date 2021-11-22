import styled from '@mui/system/styled';

const StyledFooter = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
});

const StyledAnchor = styled('a')({
  color: 'black',
  textDecoration: 'none',
  ':hover': {
    color: '#777',
  },
});

export function Footer() {
  return (
    <StyledFooter>
      <p>
        &copy;2021{' '}
        <StyledAnchor href="https://github.com/spfave">
          Sebastian F
        </StyledAnchor>
      </p>
    </StyledFooter>
  );
}
