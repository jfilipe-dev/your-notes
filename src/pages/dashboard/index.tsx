import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AreaEditor from '../../components/AreaEditor';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/useAuth';
import api from '../../services/api';

export interface Note {
  title: string;
  message: string;
}

export default function dashboard() {
  const { userInfo } = useAuth();
  const [isSmallerThan960] = useMediaQuery('(max-width: 960px)');

  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = useCallback(async () => {
    try {
      const { data } = await api.get('/notes/load', {
        params: {
          userId: userInfo.id,
        },
      });
      setNotes(data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, []);

  const handleCreateNote = useCallback(async () => {
    try {
      const { data } = await api.post('/notes/create', { userId: userInfo.id });
      setNotes((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

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
          <Sidebar createNote={handleCreateNote} notes={notes} />
        </GridItem>
        <GridItem colSpan={4}>
          <AreaEditor />
        </GridItem>
      </Grid>
    </>
  );
}
