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
  id: string;
}
export interface Props {
  sidebarCreateMocked?: () => void;
  areaEditorUpdateMocked?: () => void;
}
export default function dashboard({
  sidebarCreateMocked,
  areaEditorUpdateMocked,
}: Props) {
  const { userInfo } = useAuth();
  const [isSmallerThan960] = useMediaQuery('(max-width: 960px)');

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotes = useCallback(async (getLast = true) => {
    try {
      const { data } = await api.get('/notes/load', {
        params: {
          userId: userInfo.id,
        },
      });
      setNotes(data);
      if (getLast) {
        setSelectedNote(data[data.length - 1]);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, []);

  const handleCreateNote = useCallback(async () => {
    try {
      await api.post('/notes/create', { userId: userInfo.id });
      loadNotes();

      sidebarCreateMocked?.();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, [loadNotes]);

  const handleSelectNote = useCallback((note: Note) => {
    setSelectedNote(note);
  }, []);

  const handleUpdateNote = useCallback(async (data: Note) => {
    try {
      await api.put('/notes/update', data);
      loadNotes(false);
      toast.success('Nota atualizada com sucesso!');
      areaEditorUpdateMocked?.();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }, []);

  const handleDeleteNote = useCallback(async (noteId: string) => {
    try {
      await api.delete(`/notes/delete/`, {
        params: {
          userId: userInfo.id,
          noteId,
        },
      });
      loadNotes();
      toast.success('Nota deletada com sucesso!');
      areaEditorUpdateMocked?.();
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
          <Sidebar
            createNote={handleCreateNote}
            notes={notes}
            onSelect={handleSelectNote}
          />
        </GridItem>
        <GridItem colSpan={4}>
          <AreaEditor
            data={selectedNote}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
          />
        </GridItem>
      </Grid>
    </>
  );
}
