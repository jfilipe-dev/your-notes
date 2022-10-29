import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import Head from 'next/head';
import AreaEditor from '../../components/AreaEditor';
import Sidebar from '../../components/Sidebar';

export default function dashboard() {
  const [isSmallerThan960] = useMediaQuery('(max-width: 960px)');

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Grid
        h="100vh"
        templateColumns={isSmallerThan960 ? 'repeat(1, 1fr)' : 'repeat(5, 1fr)'}
        templateRows="repeat(2, 1fr)"
      >
        <GridItem colSpan={1}>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={4}>
          <AreaEditor />
        </GridItem>
      </Grid>
    </>
  );
}
